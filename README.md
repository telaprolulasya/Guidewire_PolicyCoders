# AI-Powered Parametric Insurance for Gig Workers

## Problem Statement
Delivery partners in India (Swiggy, Zomato, Zepto, etc.) depend on daily earnings for their livelihood. However, external disruptions such as heavy rainfall, extreme heat, high air pollution, and sudden curfews significantly reduce their working hours.

Currently, there is no financial protection system that compensates them for income loss during such events.

This project aims to build an AI-powered parametric insurance platform that automatically compensates delivery workers when predefined environmental conditions disrupt their work. The system ensures fast, transparent, and zero-touch payouts without requiring manual claim processes.

## Objectives
The primary goal of this solution is to provide financial stability to gig workers by protecting their income during disruptions.

- Provide income protection for gig workers  
- Enable automatic and instant payouts  
- Reduce financial uncertainty  
- Build a scalable insurance solution  

## Key Features
The platform focuses on automation, simplicity, and real-time data to ensure a seamless user experience.

- Weekly subscription-based insurance  
- Automatic claim triggering (parametric model)  
- Income-based payout calculation  
- Real-time monitoring (weather, AQI)  
- Fraud detection mechanism  
- Zero manual claim process  

## Workflow
The system follows a simple and automated process to ensure quick and efficient payouts.

- User registers and logs in  
- User selects a weekly insurance plan (Basic / Standard / Premium)  
- User pays the premium  
- System monitors weather and AQI  
- User can raise a ticket if needed  
- System checks data using APIs  
- If condition is met, claim is triggered  
- System calculates income loss  
- Payout is processed and credited  

## Persona
This scenario explains how the platform helps a delivery partner during disruptions.

- Sam expects to earn ₹600 on a normal day  
- Due to heavy rain, he earns only ₹200  
- He loses ₹400 of expected income  
- The system detects rainfall above threshold  
- Calculates income loss using past average  
- Automatically credits compensation  
- Ensures stable income during disruptions  

## Weekly Premium Model
The platform follows a weekly subscription model aligned with gig workers’ earnings, making it affordable and easy to adopt.

### Available Plans:
- Basic Plan → ₹20/week  
- Standard Plan → ₹30/week  
- Premium Plan → ₹40/week  

### Features:
- Flexible plan selection  
- Affordable pricing  
- Coverage based on user needs  

## Income-Based Payout Calculation
The payout is calculated based on actual income loss to ensure fair and personalized compensation.

Formula:  
Payout = Average Income (last 7 days) – Current Day Income  

Final Rule:  
Final Payout = min(Loss, Plan Coverage Limit)  

## Parametric Triggers
The system automatically triggers payouts when predefined environmental conditions are exceeded.

- Rainfall > 50 mm  
- AQI > 300  
- Temperature > 45°C  

## Fraud Detection Mechanism
To ensure reliability, the system uses multiple checks to validate claims and prevent misuse.

- Location Verification – user location check  
- Disruption Validation – API data check  
- Duplicate Prevention – no repeated claims  
- Time Validation – valid time check  
- Income Verification – income data check  
- Pattern Analysis – detect unusual claims  

## Tech Stack
The system is built using modern technologies to ensure scalability and performance.

- Frontend: React.js, Tailwind CSS  
- Backend: Spring Boot REST APIs  
- Database: MySQL  
- AI/ML: Python, Scikit-learn  
- Tools: Git, GitHub, Postman, Docker

## APIs
External APIs are used to fetch real-time environmental data and simulate system behavior.

- OpenWeather API → weather data  
- Air Quality API → AQI data  
- Mock APIs → simulation  
- Razorpay (Test Mode) → payout simulation  

## Development Plan
The project is developed in phases to ensure proper planning, implementation, and optimization.

### Phase 1 (Week 1–2)
- Define problem, persona, and workflow  
- Design system and select tech stack  
- Define triggers and premium model  
- Create README and basic UI  

### Phase 2 (Week 3–4)
- Build backend APIs  
- Integrate weather and AQI APIs  
- Implement trigger detection and payout logic  
- Add fraud detection  
- Improve UI  

### Phase 3 (Week 5–6)
- Enhance fraud detection  
- Integrate payment system  
- Build dashboard  
- Test and optimize system  
- Prepare demo and presentation  

## Future Enhancements
The platform can be further improved with advanced features and integrations.

- Advanced AI risk prediction  
- Integration with delivery platforms  
- Multi-city support  

## Impact
This solution improves financial security and builds trust among gig workers through automation.

- Protects delivery workers from income loss  
- Provides instant and fair compensation  
- Reduces financial uncertainty  
- Encourages insurance adoption  
- Builds trust through automation  

## Team Details

**Team Name:** PolicyCoders  
**Links:**
- GitHub Repository: https://github.com/telaprolulasya/Guidewire_PolicyCoders
- Demo Video: [https://youtu.be/GUr0iGdwWMM]
  

""Empowering gig workers with smart, real-time income protection""
