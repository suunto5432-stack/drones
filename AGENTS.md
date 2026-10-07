# UAV-Based Emergency Flotation Delivery System for Flood Rescue

**Final Year Project Proposal — Viva**

**Team Members**  
- Rehman Iqbal (Systems & Integration)  
- Abdullah Tahir (Airframe & Propulsion)  
- Muhammad Umer (Payload & Software)

**Type:** Undergraduate Engineering Final Year Project

---

## Project Summary

A practical, low-cost, human-in-the-loop UAV designed to deliver emergency flotation devices to people stranded in flood water. The system acts as a **first-response bridge** that buys critical time until professional rescue teams arrive.

**Core Novelty:**  
Spring-loaded, fail-safe mechanical release mechanism that **stays locked on power loss**.

---

## Key Specifications

| Parameter                  | Value                          |
|---------------------------|--------------------------------|
| Airframe                  | 650 mm-class X-frame quadcopter |
| Payload Capacity          | ~1.8 kg (flotation + release + camera) |
| Thrust-to-Weight Target   | 2 : 1                          |
| Total Thrust              | 4.8 kg (4 × 1.2 kg motors)     |
| All-up Weight             | ~4.3 kg                        |
| Control                   | Human-in-the-loop (GPS-assisted) |
| Autopilot                 | Pixhawk-class (ArduPilot / PX4) |
| Estimated Budget          | 77,500 – 148,500 PKR           |
| Timeline                  | 14 weeks                       |

---

## Problem Statement

Floods cut people off faster than rescuers can reach them. Roads become impassable and conventional rescue teams often take hours to arrive in rural areas. A fast, targeted first-response tool that delivers flotation can save lives by buying critical time.

**Pakistan Context:**
- 2022 floods affected ~33 million people
- 1,700+ lives lost in recent major flood seasons
- Typical ground team delay: hours
- UAV can reach in minutes over flooded terrain

---

## Objectives

**Primary Objective**  
Develop and demonstrate a UAV that transports and safely deploys an emergency flotation device to a person stranded in water.

**Engineering Goal**  
Design a modular 650 mm-class quadcopter with a dedicated fail-safe release mechanism sized for ~1.8 kg payload.

**Safety Goal**  
Ensure human-in-the-loop control: GPS-assisted stabilization with the pilot making the final deployment decision.

**Demonstration Goal**  
Validate the system with dry drop-tests and a controlled water demonstration using a weighted buoyant mannequin.

---

## Scope

### In Scope
- Quadcopter airframe & propulsion sizing
- Fail-safe mechanical release mechanism
- Flight controller configuration (ArduPilot/PX4)
- Telemetry, GPS & radio control
- Camera feed for operator situational awareness
- Dry drop-tests & controlled water demo
- Modular payload cradle design

### Out of Scope (this FYP)
- Fully autonomous victim detection
- AI-based search & rescue path planning
- Night / thermal imaging systems
- Long-endurance BVLOS operations
- Medical payload beyond flotation
- Integration with national emergency networks
- Production-grade waterproofing
# System Architecture

## Overview

A modular quadcopter built around one job: **deliver flotation, safely**.

### Flight Platform
- 650 mm-class X-frame
- Pixhawk-class flight controller
- GPS + telemetry
- Radio override for pilot

### Payload System
- Compact flotation device
- Cradle + release mechanism
- Servo-actuated pin
- ~1.8 kg total payload

### Human-in-the-Loop
- GPS-assisted stabilization
- Operator makes final deploy decision
- Live camera feedback
- Manual takeoff / landing

---

## Software Stack

| Layer              | Technology                          | Purpose                              |
|--------------------|-------------------------------------|--------------------------------------|
| Autopilot          | ArduPilot or PX4                    | Stabilize / Loiter / RTL modes, servo channel for release |
| Ground Control     | Mission Planner or QGroundControl   | Telemetry, parameter tuning, mission planning |
| Video Link         | FPV or digital video                | Operator situational awareness       |
| Future Vision      | Python + OpenCV (optional)          | Person / water detection (not required for MVP) |

---

## Novelty — Fail-Safe Release Mechanism

**How it works:**  
A spring-loaded pin holds the flotation device in its cradle. A servo (SG90 / MG90S-class) retracts the pin on operator command to release the payload.

**Why it is fail-safe:**  
Power loss keeps the pin engaged, so the payload stays secured — unlike an electromagnet release, which fails open and could drop the payload accidentally.

---

## Advanced Features

1. **Fail-Safe Mechanical Release** — Spring-loaded pin + servo. Power loss keeps payload locked.
2. **Modular Architecture** — Swap payloads, cameras, or sensors without redesigning the airframe.
3. **Operator Vision Link** — Live camera feed for target confirmation and precise hover.
4. **Human-in-the-Loop Control** — Pilot makes the final deploy decision.
5. **Pixhawk-Class Autopilot** — Industry-standard with full telemetry and mode suite.
6. **Extensible Sensor Suite** — Ready for future OpenCV vision, barometer, or additional telemetry.
# Hardware Breakdown & Budget

## Major Component Groups

### Airframe & Propulsion
- 650 mm carbon/plastic frame
- 4 × brushless motors (~1.2 kg thrust each)
- 4 × ESCs matched to motors
- Propellers sized for 650 class

### Avionics
- Pixhawk-class flight controller
- GPS + compass module
- Telemetry radio pair
- RC receiver + transmitter

### Power & Sensing
- Li-Po battery (appropriate C-rating)
- Power distribution board
- Camera (FPV or digital)
- Optional voltage/current sensor

### Payload Mechanism
- 3D-printed / fabricated cradle
- Spring-loaded release pin
- SG90 / MG90S servo
- Flotation device (life ring / vest)

---

## Budget Estimate (PKR)

| Component Group                          | Cost Range (PKR)     |
|------------------------------------------|----------------------|
| Frame + motors + ESCs + propulsion       | 15,000 – 28,000     |
| Flight controller (Pixhawk clone)        | 12,000 – 20,000     |
| Radio transmitter + receiver             | 15,000 – 20,000     |
| Li-Po battery, GPS, telemetry, camera    | 21,500 – 38,000     |
| Release mechanism, servo, mounting       | 6,500 – 14,500      |
| Flotation device                         | 5,000 – 25,000      |
| **Estimated Prototype Total**            | **77,500 – 148,500**|

### Budget Notes
- Prices reflect common Pakistani market listings for FYP-suitable clones
- Flotation device cost varies from basic life rings to specialized rescue floats
- Upper ends include contingency for spares
- No labour cost included
- Mid-range (~110,000 PKR) is realistic with typical FYP allocation + possible support
# Project Plan, Risks & Success Criteria

## 14-Week Timeline

| Weeks   | Phase                          | Key Activities                                      |
|---------|--------------------------------|-----------------------------------------------------|
| 1–3     | Procurement & Planning         | Finalize components, order hardware, confirm payload weight |
| 4–6     | Assembly & Bench Testing       | Frame build, motor/ESC wiring, release mechanism fabrication |
| 7–9     | Software Integration           | Flight-control config, telemetry, camera, release logic |
| 10–11   | Ground & Tethered Flight Tests | Stability testing, payload flight tests, drop tests |
| 12–14   | Water Demo & Documentation     | Controlled water demonstration, final report        |

---

## Risks & Mitigation

| Risk                              | Mitigation                                                                 |
|-----------------------------------|----------------------------------------------------------------------------|
| Component delay / stockout        | Order early (Wk 1–2); identify alternate local suppliers                   |
| Release mechanism failure         | Multiple dry drop-tests; spring-loaded design fails safe                   |
| Flight instability with payload   | 2:1 thrust margin; progressive payload tests (empty → weighted → full)     |
| Water test logistics              | Controlled environment (pool / shallow tank); mannequin only               |
| Budget overrun                    | Prioritize critical path items; use campus 3D printing if available        |
| Pilot skill / safety              | Tethered flights first; experienced pilot for free flights                 |

---

## Success Criteria

1. **Stable flight with payload** — Hover and short transit with ~1.8 kg payload within safe thrust margins.
2. **Reliable release** — ≥ 9/10 successful dry drops; no accidental release on power interruption.
3. **Fail-safe verification** — Documented test that power loss leaves pin engaged and payload secured.
4. **Controlled water demo** — At least one successful deployment to mannequin in controlled water environment.
5. **Documentation** — Full report, BOM, assembly notes, and demo video for reproducibility.
6. **Safety record** — No uncontrolled flights; all free flights under experienced pilot supervision.

---

## Demonstration Flow

Operator → UAV takes off → Flies to location → Hovers → Deploys flotation → Target receives aid → UAV returns

**Success Definition:** Stable hover + reliable release + flotation reaches target zone.
# Related Work & Future Extensions

## Positioning Against Existing Concepts

- **Surveillance-focused rescue UAVs** — Many projects emphasize cameras and detection. Few publish a dedicated mechanical fail-safe release sized for flotation.
- **Delivery drones (general)** — Optimized for ground targets; often use electromagnet or latch mechanisms that fail open.
- **Commercial SAR drones** — High-end systems are expensive and rarely modular for student replication in Pakistan.

**This project’s niche:**  
Low-cost, flood-specific, fail-safe pin release, human-in-the-loop, and fully documented for local reproducibility.

---

## Future Extensions (Beyond Current FYP)

| Extension                    | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| Vision-assisted targeting   | Python + OpenCV person/water detection to cue the operator                  |
| Longer-range telemetry      | Upgrade radio and video links for larger flood zones under legal limits     |
| Multi-payload variants      | Medicine packs, radio beacons, or lightweight first-aid kits on the same cradle |
| Team coordination           | Simple ground app for multiple operators / multiple UAVs                    |
| Field trials with agencies  | Partner with local rescue services for realistic scenario testing           |
| Improved airframe           | Folding arms, better weather sealing, and higher endurance batteries        |   