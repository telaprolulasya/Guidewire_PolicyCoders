from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from pydantic import BaseModel
import os
import requests
import random
from datetime import datetime
from sklearn.ensemble import RandomForestClassifier
import numpy as np

# ----------------- Configuration & DB setup ----------------- #
DATABASE_URL = "sqlite:///./insurance.db"  # As requested, SQLite database for ease of use
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# FastAPI Initialization
app = FastAPI(title="AI Assurance Admin API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Database Models ----------------- #
class WorkerDB(Base):
    __tablename__ = "workers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    city = Column(String)
    plan_id = Column(Integer)
    status = Column(String, default="Active")

class PlanDB(Base):
    __tablename__ = "plans"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String) # e.g. Basic, Pro
    price = Column(Float) # 20, 30, 40
    coverage_limit = Column(Float)

class RuleDB(Base):
    __tablename__ = "rules"
    id = Column(Integer, primary_key=True, index=True)
    metric = Column(String) # Rain, AQI, Orders
    condition = Column(String) # '>', '<'
    threshold = Column(Float)
    payout_percentage = Column(Float) # Percentage of max coverage

class PayoutDB(Base):
    __tablename__ = "payouts"
    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer)
    amount = Column(Float)
    reason = Column(String)
    date = Column(String)

class DisruptionDB(Base):
    __tablename__ = "disruptions"
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String)
    type = Column(String)
    severity = Column(String)
    active = Column(Boolean, default=True)

class FraudAlertDB(Base):
    __tablename__ = "fraud_alerts"
    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer)
    reason = Column(String)
    reported_date = Column(String)

# Create tables
Base.metadata.create_all(bind=engine)

# ----------------- ML Model (Scikit-Learn) ----------------- #
# A simple mock ML risk classifier
# Features: [Rain(mm), Temp, AQI]
# Outputs: 0 (Low), 1 (Medium), 2 (High) risk
ml_model = RandomForestClassifier(n_estimators=10, random_state=42)

def train_mock_model():
    # Training data (mock)
    X = np.array([
        [0,  25, 50],  # Low rain, nice temp, low AQI -> Low Risk (0)
        [10, 35, 100], # Some rain, hot, moderate AQI -> Low Risk (0)
        [50, 20, 150], # Heavy rain -> Med Risk (1)
        [10, 40, 250], # Extreme heat, high AQI -> Med Risk (1)
        [100,25, 300], # Flood, terrible AQI -> High Risk (2)
        [0,  45, 400], # Extreme heat + max AQI -> High Risk (2)
    ])
    y = np.array([0, 0, 1, 1, 2, 2])
    ml_model.fit(X, y)

train_mock_model()

# ----------------- Pydantic Schemas ----------------- #
class RuleCreate(BaseModel):
    metric: str
    condition: str
    threshold: float
    payout_percentage: float
    
class PlanCreate(BaseModel):
    name: str
    price: float
    coverage_limit: float

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------- Application Logic & Endpoints ----------------- #

# Populate mock data initially if empty
def seed_data(db: Session):
    if db.query(WorkerDB).count() == 0:
        db.add_all([
            WorkerDB(name="Rahul Kumar", city="Mumbai", plan_id=1),
            WorkerDB(name="Priya Sharma", city="Delhi", plan_id=2),
            WorkerDB(name="Amit Singh", city="Bangalore", plan_id=3)
        ])
    if db.query(PlanDB).count() == 0:
        db.add_all([
            PlanDB(name="Basic", price=20, coverage_limit=500),
            PlanDB(name="Pro", price=30, coverage_limit=1000),
            PlanDB(name="Max", price=40, coverage_limit=2000)
        ])
    if db.query(RuleDB).count() == 0:
        db.add_all([
            RuleDB(metric="Rain", condition=">", threshold=50, payout_percentage=50),
            RuleDB(metric="AQI", condition=">", threshold=300, payout_percentage=40),
            RuleDB(metric="Orders", condition="<", threshold=5, payout_percentage=100)
        ])
    db.commit()

@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    seed_data(db)
    db.close()

# 1. Dashboard Overview
@app.get("/admin/overview")
def get_overview(db: Session = Depends(get_db)):
    workers_count = db.query(WorkerDB).count()
    policies_count = db.query(PlanDB).count()  # Treat as distinct plan definitions, or mapped policies
    total_payouts_sum = db.query(PayoutDB).with_entities(PayoutDB.amount).all()
    total_paj = sum([p[0] for p in total_payouts_sum]) if total_payouts_sum else 0
    active_disrupts = db.query(DisruptionDB).filter(DisruptionDB.active == True).count()
    
    return {
        "totalUsers": workers_count,
        "activePolicies": workers_count, # Assume 1 per worker
        "totalPayouts": total_paj,
        "activeDisruptions": active_disrupts
    }

# 2. Risk Monitoring (with ML + OpenWeather concept)
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "mock_key")

@app.get("/admin/risk")
def get_risk_monitoring():
    # In a real scenario, requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}")
    # Since we are demoing, we provide mock current weather using the ML model to score risk
    cities = [
        {"name": "Mumbai", "rain": random.randint(0, 100), "temp": 30, "aqi": random.randint(50, 350)},
        {"name": "Delhi", "rain": random.randint(0, 20), "temp": 42, "aqi": random.randint(150, 450)},
        {"name": "Bangalore", "rain": random.randint(0, 50), "temp": 25, "aqi": random.randint(50, 200)},
    ]
    
    results = []
    for c in cities:
        features = np.array([[c["rain"], c["temp"], c["aqi"]]])
        pred = ml_model.predict(features)[0]
        risk_lvl = "High" if pred == 2 else ("Medium" if pred == 1 else "Low")
        results.append({**c, "riskLevel": risk_lvl})
        
    return results

# 3. Disruption Monitoring
@app.get("/admin/disruptions")
def get_disruptions(db: Session = Depends(get_db)):
    disruptions = db.query(DisruptionDB).filter(DisruptionDB.active == True).all()
    return disruptions

# 4. Plan Management
@app.get("/admin/plans")
def get_plans(db: Session = Depends(get_db)):
    return db.query(PlanDB).all()

@app.post("/admin/plans")
def create_plan(plan: PlanCreate, db: Session = Depends(get_db)):
    new_plan = PlanDB(**plan.dict())
    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)
    return new_plan

# 5. Parametric Rule Configuration
@app.get("/admin/rules")
def get_rules(db: Session = Depends(get_db)):
    return db.query(RuleDB).all()

@app.post("/admin/rules")
def create_rule(rule: RuleCreate, db: Session = Depends(get_db)):
    new_rule = RuleDB(**rule.dict())
    db.add(new_rule)
    db.commit()
    db.refresh(new_rule)
    return new_rule

# 6. Payout Monitoring
@app.get("/admin/payouts")
def get_payouts(db: Session = Depends(get_db)):
    return db.query(PayoutDB).order_by(PayoutDB.id.desc()).limit(10).all()

# 7. Fraud Detection Panel
@app.get("/admin/fraud")
def get_fraud_alerts(db: Session = Depends(get_db)):
    # Create some mock alerts if none exist
    if db.query(FraudAlertDB).count() == 0:
        db.add_all([
            FraudAlertDB(worker_id=1, reason="GPS mismatch with claim location", reported_date="2026-04-01"),
            FraudAlertDB(worker_id=2, reason="Multiple claims under 1 hour", reported_date="2026-04-02")
        ])
        db.commit()
    return db.query(FraudAlertDB).all()

# 8. Worker Management
@app.get("/admin/workers")
def get_workers(db: Session = Depends(get_db)):
    return db.query(WorkerDB).all()

# 9. Event Trigger (Demo)
class TriggerEvent(BaseModel):
    event_type: str # 'Rain', 'Curfew', 'Pollution'
    city: str

@app.post("/admin/trigger")
def trigger_event(event: TriggerEvent, db: Session = Depends(get_db)):
    # 1. Update Disruptions
    new_disruption = DisruptionDB(
        city=event.city, 
        type=event.event_type, 
        severity="High Impact", 
        active=True
    )
    db.add(new_disruption)
    db.commit()
    
    # 2. Run Parametric Rules against this event
    # Find active rules matching this metric
    rules = db.query(RuleDB).filter(RuleDB.metric == event.event_type).all()
    # Mock some triggered payouts
    workers_in_city = db.query(WorkerDB).filter(WorkerDB.city == event.city).all()
    
    payouts_made = 0
    total_amount = 0
    
    for worker in workers_in_city:
        # Find plan for worker
        plan = db.query(PlanDB).filter(PlanDB.id == worker.plan_id).first()
        if plan:
            # Flat ₹ payout for demo based on triggering
            amount = plan.coverage_limit * 0.5 # 50% payout
            
            p = PayoutDB(
                worker_id=worker.id,
                amount=amount,
                reason=f"Triggered by {event.event_type} event",
                date=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            )
            db.add(p)
            payouts_made += 1
            total_amount += amount
            
    db.commit()
    
    return {
        "message": f"Event {event.event_type} triggered for {event.city}.",
        "payouts_processed": payouts_made,
        "total_distributed": total_amount
    }
