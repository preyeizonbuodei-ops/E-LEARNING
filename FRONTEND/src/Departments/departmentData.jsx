import mechatronics from "../Image/robot1.jpg";
import mechanical from "../Image/mechanical.jpg";
import civil from "../Image/civil.jpg";
import electrical from "../Image/electrical.jpg";
import Petroleum from "../Image/petroleum.jpg";
import chemical from "../Image/chemical.jpg";

import robotics from "../Image/robotics.jpg";
import embeded from "../Image/embeded.jpg";
import automation from "../Image/automation.jpg";
import control from "../Image/control.jpg";

import mechanicalimg1 from "../Image/mechanical1.jpg";
import mechanicalimg2 from "../Image/mechanical2.jpg";
import mechanicalimg3 from "../Image/mechanical3.jpg";
import mechanicalimg4 from "../Image/mechanical4.jpg";

import civileng1 from "../Image/civil1.jpg";
import civileng2 from "../Image/civil2.jpg";
import civileng3 from "../Image/civil3.jpg";
import civileng4 from "../Image/civil4.jpg";

import petandgas1 from "../Image/petgas1.jpg";
import petandgas2 from "../Image/petgas2.jpg";
import petandgas3 from "../Image/petgas3.jpg";
import petandgas4 from "../Image/petgas4.jpg";

import elect1 from "../Image/electrical1.jpg";
import elect2 from "../Image/electrical2.jpg";
import elect3 from "../Image/electrical3.jpg";
import elect4 from "../Image/electrical4.jpg";

import chemicaleng1 from "../Image/chemical1.jpg";
import chemicaleng2 from "../Image/chemical2.jpg";
import chemicaleng3 from "../Image/chemical3.jpg";
import chemicaleng4 from "../Image/chemical4.jpg";


export const departments = [
    {
        id: "mechatronics-engineering",
        name: "Mechatronics Engineering",
        headerParagraph: `Designinig bulding and improving the machines and systems that power or world. 
        From energy to transportation, 
        machatronics engineering shapes a more efficient and sustainable future`,
        image: mechatronics,

        description: `Mechatronics Engineering is an interdisciplinary field that combines mechanical engineering, electronics, computer science, and control systems to create intelligent and automated technologies.`,

        history: `Mechatronics engineering emerged from the growing need to combine mechanical engineering with electronics, control systems, and computer technology. The term mechatronics was first introduced in Japan in the late 1960s by engineer Tetsuro Mori of Yaskawa Electric Corporation. It was originally used to describe the integration of mechanical systems with electronic control technologies.

        During the 1970s and 1980s, advances in microprocessors, sensors, computers, and automation accelerated the development of mechatronics. Engineers began combining mechanical components with electronic controllers and software to create smarter and more automated machines. This approach became increasingly important in manufacturing, robotics, automotive systems, and industrial automation.`,

        majorArea: [
            {
                id: "robotics",
                name: "Robotics",
                image: robotics,
                description:
                    "Robotics is a field of engineering focused on the design, development, and control of machines that can perform tasks automatically or with minimal human intervention.",

                    topics: [
                        {
                        id: "autonomous-robotics",
                        title: "Autonomous Robotics",
                        description: "Development of robots that can navigate, make decisions, and perform tasks with minimal human intervention.",

                        materials: [
                            {
                               id:  "introduction-autonomous-robotics",
                               title: "INRODUCTION TO AUTONOMOUS ROBOTICS",
                               type: "pdf",
                               url: "/materials/autonomous-robotics"
                        },

                        {
                            id: "automomous-robots-1",
                            title: "Autonomous Robotics Lecture",
                            type: "video",
                            url: "https://youtube.com/..."
                        }
                        ],

                        externalResourse: [
                            {
                                id: "learn-autonomous",
                                type: "pdf",
                                title: "Learn Autonomous Robotics",
                                url: "https://example.com"
                            }
                        ]
                    },

                    {
                        id: "human-robot-interaction",
                        title: "Human-Robot Interaction",
                        description: "Research on how humans and robots can communicate, collaborate, and safely work together.",

                        materials: [
                            {
                               id:  "introduction-human-robot-interaction",
                               title: "INRODUCTION TO AUTONOMOUS ROBOTICS",
                               type: "pdf",
                               url: "/materials/autonomous-robotics"
                        },

                        {
                            id: "autonomous-robotics-lecture",
                            title: "Autonomous Robotics Lecture",
                            type: "video",
                            url: "https://youtube.com/..."
                        }
                        ],

                        externalResourse: [
                            {
                                id: "learn-autonomous-robotics",
                                title: "Learn Autonomous Robotics",
                                type: "video",
                                url: "https://example.com"
                            }
                        ]
                    },

                    {
                        id: "swarm-robotics",
                        title: "Swarm Robotics",
                        description: "Study of multiple robots working together through coordination and communication to accomplish tasks collectively.",

                        materials: [
                            {
                               id:  "introduction-to-swarm-robotics",
                               title: "INRODUCTION TO Swarm Robotics",
                               url: "/materials/autonomous-robotics"
                        },

                        {
                            id: "swarm-Lecture",
                            title: "swarm Lecture",
                            type: "video",
                            url: "https://youtube.com/..."
                        }
                        ],

                        externalResourse: [
                            {
                                id: "automomus-2",
                                title: "Learn Autonomous Robotics",
                                url: "https://example.com"
                            }
                        ]
                    },

                    {
                        id: "ai-intelligent-robotics",
                        title: "AI and Intelligent Robotics",
                        description: "Application of artificial intelligence and machine learning to create robots that can learn, perceive, and make intelligent decisions.",
                        materials: [
                            {
                               id:  "introduction-to-ai-intelligent-robotics1",
                               title: "INRODUCTION TO Swarm Robotics",
                               url: "/materials/autonomous-robotics"
                        },

                        {
                            id: "introduction-to-ai-intelligent-robotics2",
                            title: "AI and Intelligent Robotics2",
                            type: "video",
                            url: "https://youtube.com/..."
                        }
                        ],

                        externalResourse: [
                            {
                                id: "intelligent-roboticspdf",
                                title: "Learn Autonomous Robotics",
                                url: "https://example.com"
                            }
                        ]
                    },

                ]
            },

            {
                id: "embedded-systems",
                name: "Embedded Systems",
                image: embeded,
                description:
                    "Embedded Systems focuses on the design of computer-based systems built into machines and electronic devices to perform specific tasks.",

                    topics: [
                        { 
                            id: "microcontroller-systems", title: "Microcontroller Systems", description: "Design and development of embedded systems using microcontrollers to control electronic devices and perform dedicated tasks.",
                            materials: [
                            {
                               id:  "introduction-to-microcontroller-systems1",
                               title: "INRODUCTION TO microcontroller systems1",
                                url: "/materials/autonomous-robotics"
                            },

                            {
                                id: "introduction-to-microcontroller-systems2",
                                title: "microcontroller-systems1",
                                type: "video",
                                url: "https://youtube.com/..."
                            }
                            ],

                            externalResourse: [
                                {
                                    id: "introduction-to-microcontroller-systems2pdf",
                                    title: "Learn Autonomous Robotics",
                                    url: "https://example.com"
                                }
                            ] 
                        },

                        { 
                            id: "internet-of-things", title: "Internet of Things (IoT)", description: "Development of connected embedded devices that collect, process, and exchange data over networks for monitoring and automation.",
                            
                             materials: [
                            {
                               id:  "iww-systems1",
                               title: "INRODUCTION TO microcontroller systems1",
                                url: "/materials/autonomous-robotics"
                            },

                            {
                                id: "ee-systems2",
                                title: "microcontroller-systems1",
                                type: "video",
                                url: "https://youtube.com/..."
                            }
                            ],

                            externalResourse: [
                                {
                                    id: "333-systems2pdf",
                                    title: "Learn Autonomous Robotics",
                                    url: "https://example.com"
                                }
                            ] 
                        },

                        { 
                            id: "real-time-embedded-systems", title: "Real-Time Embedded Systems", description: "Design of systems that process information and respond to events within strict timing requirements." ,

                             materials: [
                            {
                               id:  "fff-systems1",
                               title: "INRODUCTION TO microcontroller systems1",
                                url: "/materials/autonomous-robotics"
                            },

                            {
                                id: "hhh-systems2",
                                title: "microcontroller-systems1",
                                type: "video",
                                url: "https://youtube.com/..."
                            }
                            ],

                            externalResourse: [
                                {
                                    id: "jhjhintroduction-to-microcontroller-systems2pdf",
                                    title: "Learn Autonomous Robotics",
                                    url: "https://example.com"
                                }
                            ] 

                        },

                        { 
                            id: "embedded-system-design", title: "Embedded System Design", description: "Research into the hardware and software architecture required to build reliable, efficient, and specialized embedded systems.",
                             materials: [
                            {
                               id:  "introduction-to-microcontroller-systems1",
                               title: "INRODUCTION TO microcontroller systems1",
                                url: "/materials/autonomous-robotics"
                            },

                            {
                                id: "introduction-to-microcontroller-systems2",
                                title: "microcontroller-systems1",
                                type: "video",
                                url: "https://youtube.com/..."
                            }
                            ],

                            externalResourse: [
                                {
                                    id: "introduction-to-microcontroller-systems2pdf",
                                    title: "Learn Autonomous Robotics",
                                    url: "https://example.com"
                                }
                            ] 
                         },

                        { 
                            id: "embedded-software-development", title: "Embedded Software Development", description: "Development of software and firmware that enables embedded devices to control hardware and perform specific functions." 
                        },

                        { 
                            id: "embedded-systems-security", title: "Embedded Systems Security", description: "Research into protecting embedded devices, communication channels, and stored data from cyber threats and unauthorized access." 

                        },

                        { 
                            id: "embedded-ai-edge-computing", title: "Embedded AI and Edge Computing", description: "Application of artificial intelligence directly on embedded devices to process data and make decisions locally."

                         },

                         {
                             id: "automotive-embedded-systems", title: "Automotive Embedded Systems", description: "Development of embedded technologies used in vehicles for engine control, safety systems, navigation, and driver assistance."

                          }
                    ]
            },

            {
                id: "automation",
                name: "Automation",
                image: automation,
                description:
                    "Automation is the use of technology and control systems to perform tasks and processes with minimal human intervention.",

                    topics: [ 
                        { 
                            id: "industrial-automation", title: "Industrial Automation", description: "Application of automated technologies to improve manufacturing, production, assembly, and industrial processes." 

                        }, 
                        
                        { 
                            id: "process-automation", title: "Process Automation", description: "Development of automated systems for monitoring, controlling, and optimizing industrial processes."
                         },

                         { 
                            id: "smart-manufacturing", title: "Smart Manufacturing", description: "Integration of automation, sensors, data, and intelligent technologies to create efficient and connected manufacturing systems." 
                        }, 
                        
                        { 
                            id: "robotic-automation", title: "Robotic Automation", description: "Application of robotic systems to perform repetitive, complex, and precision-based tasks with minimal human intervention."
                         }, 
                         
                         { 
                            id: "industrial-control", title: "Industrial Control Systems", description: "Design of systems that monitor and automatically regulate industrial equipment and processes for safe and reliable operation."
                         }, 
                         
                         { 
                            id: "plc-automation", title: "PLC-Based Automation", description: "Development of automated control systems using programmable logic controllers to manage industrial machines and processes." 
                        }, 
                        
                        { id: "scada-systems", title: "SCADA Systems", description: "Use of supervisory control and data acquisition systems to monitor, control, and collect data from industrial processes." 

                        }, 
                        
                        { id: "automated-material-handling", title: "Automated Material Handling", description: "Development of automated systems for transporting, sorting, storing, and managing materials in industrial environments." 

                        }, 
                        
                        { id: "automation-and-iot", title: "Automation and IoT", description: "Integration of Internet of Things technologies with automation systems to enable connected monitoring, control, and intelligent decision-making."
                            
                         } ]
            },

            {
                id: "control-systems",
                name: "Control Systems",
                image: control,
                description:
                    "Control Systems focuses on the design and development of systems that monitor, regulate, and control processes automatically.",

                    topics: [ 
                        { 
                            id: "feedback-control-systems", title: "Feedback Control Systems", description: "Development of control systems that use feedback to monitor and adjust system performance for accurate and stable operation." 
                        }, 
                        
                        { 
                            id: "pid-control", title: "PID Control", description: "Application of proportional, integral, and derivative control techniques to achieve accurate and stable system performance."
                         },
                         
                         { 
                            id: "adaptive-control", title: "Adaptive Control", description: "Development of control systems that automatically adjust their behavior when system conditions or parameters change." 

                         }, 
                         { 
                            id: "intelligent-control", title: "Intelligent Control", description: "Application of artificial intelligence and computational techniques to develop advanced and autonomous control systems." 

                         }, 
                         
                         { 
                            id: "process-control", title: "Process Control", description: "Monitoring and regulation of industrial processes to maintain desired operating conditions and improve efficiency." 
                        }, 
                        
                        { 
                            id: "optimal-control", title: "Optimal Control", description: "Development of control strategies that optimize system performance while minimizing energy, cost, time, or other resources." 

                        }, 
                        
                        { 
                            id: "digital-control", title: "Digital Control Systems", description: "Design and implementation of computer-based control systems for monitoring and controlling modern engineering processes." 
                        }, 
                        
                        { 
                            id: "nonlinear-control", title: "Nonlinear Control", description: "Study and development of control techniques for systems whose behavior cannot be accurately described using linear models."
                        }, 

                        { 
                            id: "robust-control", title: "Robust Control", description: "Development of control systems that maintain reliable performance despite uncertainties, disturbances, and changes in system conditions."
                         } 
                        ],
            }
        ]
    },

    {
        id: "mechanical-engineering",
        name: "Mechanical Engineering",
        image: mechanical,

        description:
            "Mechanical Engineering deals with the design, analysis, manufacturing, and operation of machines, mechanical systems, and energy systems.",

        history:
            `Mechanical Engineering has its roots in ancient civilizations, where people developed simple machines such as levers, wheels, pulleys, and gears to solve practical problems. Over time, these ideas evolved through advances in mathematics, physics, and engineering.

            The field grew rapidly during the Industrial Revolution in the 18th and 19th centuries, when the invention of the steam engine and the development of factories created a need for engineers who could design and improve machines. Mechanical engineering gradually became a formal discipline, with universities establishing dedicated programs to study mechanics, thermodynamics, materials, and machine design.

            During the 20th century, mechanical engineering expanded into areas such as automobiles, aircraft, robotics, manufacturing, energy systems, and automation. Today, it continues to evolve alongside modern technology, incorporating computer-aided design, artificial intelligence, robotics, renewable energy, and advanced manufacturing.`,

        majorArea: [
            {
                id: "thermodynamics",
                name: "Thermodynamics",
                image: mechanicalimg1,
                description:
                    "Thermodynamics studies energy, heat, work, and their interactions within physical systems.",

                    topics: [ 
                        { 
                            id: "thermodynamic-systems", title: "Thermodynamic Systems", description: "Study of closed, open, and isolated systems and how energy and matter interact within engineering processes." 
                        }, 
                        
                        { 
                            id: "heat-transfer", title: "Heat Transfer", description: "Study of how thermal energy moves through conduction, convection, and radiation in engineering systems." 
                        }, 
                        
                        { 
                            id: "thermodynamic-cycles", title: "Thermodynamic Cycles", description: "Analysis and design of cycles used in engines, power plants, refrigeration systems, and other energy conversion processes." 
                        }, 
                        
                        { 
                            id: "energy-conversion", title: "Energy Conversion", description: "Study of methods for converting energy between different forms for efficient use in engineering applications." 
                        }, 
                        
                        { 
                            id: "power-generation", title: "Power Generation", description: "Application of thermodynamic principles to the design and operation of systems that generate electrical and mechanical power."
                         }, 
                         
                         { id: "refrigeration-air-conditioning", title: "Refrigeration and Air Conditioning", description: "Study of refrigeration and cooling systems used to control temperature and maintain desired environmental conditions."

                          }, 
                          
                          { 
                            id: "combustion", title: "Combustion Engineering", description: "Study of chemical reactions involving fuels and oxygen and their application in engines, boilers, turbines, and energy systems." 

                          }, 
                          { 
                            id: "renewable-energy-systems", title: "Renewable Energy Systems", description: "Application of thermodynamic principles to solar, geothermal, biomass, and other renewable energy technologies." 
                        }, 
                        
                        { 
                            id: "energy-efficiency", title: "Energy Efficiency", description: "Research into improving energy utilization and reducing losses in thermal and mechanical engineering systems."
                         },
                        ]
            },

            {
                id: "fluid-mechanics",
                name: "Fluid Mechanics",
                image: mechanicalimg2,
                description:
                    "Fluid Mechanics focuses on the behavior and movement of liquids and gases.",

                    topics: [
                         { 
                            id: "fluid-properties", title: "Fluid Properties", description: "Study of the physical properties of fluids, including density, viscosity, pressure, and compressibility." 
                        }, 
                        
                        { 
                            id: "fluid-statics", title: "Fluid Statics", description: "Study of fluids at rest and the forces and pressures they exert on surfaces and structures." 
                        }, 
                        
                        { 
                            id: "fluid-dynamics", title: "Fluid Dynamics", description: "Study of fluids in motion and the forces, velocities, and pressure changes associated with fluid flow." 
                        }, 
                        
                        { 
                            id: "fluid-flow-analysis", title: "Fluid Flow Analysis", description: "Analysis of fluid movement through pipes, channels, ducts, and other engineering systems." 
                        }, 
                        
                        { 
                            id: "computational-fluid-dynamics", title: "Computational Fluid Dynamics", description: "Use of computational methods and simulations to analyze and predict the behavior of fluid flows." 
                        
                        }, 
                        
                        { 
                            id: "turbomachinery", title: "Turbomachinery", description: "Study of machines that transfer energy between fluids and rotating components, including turbines, pumps, and compressors." 
                        }, 
                        
                        { 
                            id: "aerodynamics", title: "Aerodynamics", description: "Study of how air and other gases flow around objects such as aircraft, vehicles, and engineering structures." 

                        }, 
                        
                        { 
                            id: "hydraulics", title: "Hydraulics", description: "Application of fluid mechanics principles to systems that use pressurized liquids to transmit power and perform work." 
                        
                        }, 
                        
                        { 
                            id: "multiphase-flow", title: "Multiphase Flow", description: "Study of systems involving two or more interacting phases, such as liquid-gas, liquid-solid, or gas-solid flows." 
                        } ]
            },

            {
                id: "machine-design",
                name: "Machine Design",
                image: mechanicalimg3,
                description:
                    "Machine Design involves the development of mechanical components and machines that can perform specific functions safely and efficiently.",

                    topics: [ 
                        { 
                            id: "machine-elements", title: "Machine Elements", description: "Study and design of mechanical components such as gears, shafts, bearings, springs, couplings, and fasteners." 
                        }, 
                        
                        { 
                            id: "mechanical-design-principles", title: "Mechanical Design Principles", description: "Application of engineering principles to design machines and components that are safe, reliable, efficient, and functional." 
                        }, 
                        
                        { 
                            id: "gear-design", title: "Gear Design", description: "Design and analysis of gears and transmission systems used to transfer motion and power between mechanical components." 
                        }, 
                        
                        { 
                            id: "shaft-design", title: "Shaft Design", description: "Design and analysis of shafts that transmit torque and rotational power while withstanding mechanical loads." 
                        }, 
                        
                        { 
                            id: "bearing-design", title: "Bearing Design", description: "Study and selection of bearings that support rotating components while reducing friction, wear, and energy losses." 
                        }, 
                        
                        { 
                            id: "failure-analysis", title: "Machine Failure Analysis", description: "Investigation of mechanical failures caused by fatigue, wear, excessive loads, corrosion, and material defects."
                         }, 

                         { 
                            id: "fatigue-and-fracture", title: "Fatigue and Fracture", description: "Study of how repeated loading and material defects can lead to cracks, fatigue damage, and mechanical failure." 
                        }, 
                        
                        { 
                            id: "computer-aided-design", title: "Computer-Aided Design", description: "Use of computer-based tools to create, model, analyze, and optimize mechanical components and machine systems." 
                        }, 
                        
                        { 
                            id: "design-optimization", title: "Design Optimization", description: "Application of engineering methods to improve machine designs by reducing weight, cost, energy consumption, and material usage." 
                        } ]
            },

            {
                id: "manufacturing",
                name: "Manufacturing",
                image: mechanicalimg4,
                description:
                    "Manufacturing focuses on the processes and technologies used to transform raw materials into finished products.",

                    topics: [ 
                        { 
                            id: "manufacturing-processes", title: "Manufacturing Processes", description: "Study of processes used to transform raw materials into finished products through machining, forming, casting, and other techniques." 
                        }, 
                        
                        { 
                            id: "machining", title: "Machining", description: "Study of material removal processes such as turning, milling, drilling, and grinding used to produce precise components." 
                        }, 
                        
                        { 
                            id: "additive-manufacturing", title: "Additive Manufacturing", description: "Development of products by building components layer by layer using technologies such as 3D printing." 
                        }, 
                        
                        { 
                            id: "advanced-manufacturing", title: "Advanced Manufacturing", description: "Application of modern technologies, automation, robotics, and intelligent systems to improve manufacturing operations."
                         }, 
                         
                         { 
                            id: "manufacturing-automation", title: "Manufacturing Automation", description: "Use of automated machines, robotics, and control systems to improve production efficiency, consistency, and safety." 
                        }, 
                        
                        { 
                            id: "production-engineering", title: "Production Engineering", description: "Optimization of production systems, processes, resources, and workflows to achieve efficient and reliable manufacturing." 
                        }, 
                        
                        { 
                            id: "materials-processing", title: "Materials Processing", description: "Study of methods used to shape, modify, and improve the properties of metals, polymers, ceramics, and composite materials." 
                        }, 
                        
                        { id: "manufacturing-quality-control", title: "Manufacturing Quality Control", description: "Application of inspection, measurement, and testing techniques to ensure manufactured products meet required standards." 

                        }, 
                        
                        { 
                            id: "computer-integrated-manufacturing", title: "Computer-Integrated Manufacturing", description: "Integration of computer systems, design software, production equipment, and automation technologies to manage manufacturing operations." } ]
            }
        ]
    },

    {
        id: "civil-engineering",
        name: "Civil Engineering",
        image: civil,

        description:
            "Civil Engineering focuses on the planning, design, construction, and maintenance of infrastructure that supports modern society.",

        history:
            `Civil Engineering is the branch of engineering concerned with the design, construction, and maintenance of the infrastructure that supports modern society. It covers structures such as buildings, bridges, roads, dams, water systems, and transportation networks.

            From ancient civilizations that built pyramids, roads, and aqueducts to today's smart cities and sustainable infrastructure, civil engineering has continuously evolved through advances in science, materials, and technology.

            Today, civil engineers combine innovation, technology, and sustainability to create safe, efficient, and resilient infrastructure that improves communities and shapes the future.`,

        majorArea: [
            {
                id: "structural-engineering",
                name: "Structural Engineering",
                image: civileng1,
                description:
                    "Structural Engineering focuses on the analysis and design of structures that safely support loads and resist environmental forces.",

                    topics: [ 
                        { 
                            id: "structural-analysis", title: "Structural Analysis", description: "Study of how structures respond to loads, forces, and environmental conditions to ensure safe and reliable performance."
                         },
                          { 
                            id: "structural-design", title: "Structural Design", description: "Design of buildings, bridges, and other structures to safely withstand expected loads while maintaining efficiency and durability." 
                        }, 
                        
                        { id: "reinforced-concrete", title: "Reinforced Concrete Structures", description: "Study and design of concrete structures strengthened with steel reinforcement to improve their strength and durability." 

                        }, 
                        
                        { id: "steel-structures", title: "Steel Structures", description: "Design, analysis, and construction of structures using steel members for buildings, bridges, towers, and industrial facilities." 

                        }, 
                        
                        { id: "structural-dynamics", title: "Structural Dynamics", description: "Study of how structures respond to dynamic loads such as vibrations, earthquakes, wind, and moving vehicles." 

                        }, 
                        
                        { 
                            id: "earthquake-engineering", title: "Earthquake Engineering", description: "Development of structural systems and techniques that improve the ability of buildings and infrastructure to withstand earthquakes." 
                        }, 
                        
                        { 
                            id: "structural-materials", title: "Structural Materials", description: "Study of the properties, behavior, and performance of materials used in structural construction." 
                        }, 
                        
                        { id: "structural-health-monitoring", title: "Structural Health Monitoring", description: "Use of sensors, data analysis, and monitoring technologies to detect damage and assess the condition of structures." 

                        }, 
                        
                        { id: "bridge-engineering", title: "Bridge Engineering", description: "Planning, analysis, design, and maintenance of bridges to provide safe and efficient transportation infrastructure." 

                        } ]
            },

            {
                id: "geotechnical-engineering",
                name: "Geotechnical Engineering",
                image: civileng2,
                description:
                    "Geotechnical Engineering studies the behavior and properties of soil and rock and their interaction with structures.",

                    topics: 
                    [ { 
                        id: "soil-mechanics", title: "Soil Mechanics", description: "Study of the physical and mechanical properties of soil and how it behaves under different loading and environmental conditions." 
                    }, 
                    
                    { 
                        id: "foundation-engineering", title: "Foundation Engineering", description: "Design and analysis of foundations that safely transfer structural loads to the underlying soil or rock."
                     }, 
                     
                     { 
                        id: "ground-improvement", title: "Ground Improvement", description: "Application of techniques to improve the strength, stability, and performance of weak or problematic soils." 

                     }, 
                     { 
                        id: "geotechnical-investigation", title: "Geotechnical Investigation", description: "Assessment of soil and rock conditions through field and laboratory investigations to support safe engineering design." 
                    }, 
                    
                    { 
                        id: "slope-stability", title: "Slope Stability", description: "Study and analysis of natural and constructed slopes to prevent landslides, erosion, and other forms of ground failure." 

                    }, 
                    
                    { 
                        id: "rock-mechanics", title: "Rock Mechanics", description: "Study of the behavior and mechanical properties of rock masses for applications in construction, mining, and infrastructure." 
                    }, 
                    
                    { 
                        id: "earth-retaining-structures", title: "Earth Retaining Structures", description: "Design and analysis of retaining walls and other structures used to support soil and resist lateral earth pressures." 
                    }, 
                    
                    { 
                        id: "geotechnical-earthquake-engineering", title: "Geotechnical Earthquake Engineering", description: "Study of how soils and foundations respond to earthquakes and methods for improving ground and structural stability." 
                    }, 
                    
                    { 
                        id: "geosynthetics", title: "Geosynthetics", description: "Application of synthetic materials such as geotextiles and geogrids to improve soil stability, drainage, and ground performance." 
                    } ]
            },

            {
                id: "transportation",
                name: "Transportation",
                image: civileng3,
                description:
                    "Transportation Engineering focuses on the planning, design, construction, and management of transportation systems.",

                    topics: [ 
                        { 
                            id: "transportation-planning", title: "Transportation Planning", description: "Planning and development of transportation systems to meet the movement needs of people and goods efficiently and safely." 
                        }, 
                        
                        { 
                            id: "traffic-engineering", title: "Traffic Engineering", description: "Study and management of traffic flow, road capacity, intersections, signals, and other factors that affect transportation efficiency." 
                        }, 
                        
                        { 
                            id: "highway-engineering", title: "Highway Engineering", description: "Planning, design, construction, and maintenance of highways and road networks for safe and efficient transportation." 
                        }, 
                        
                        { 
                            id: "transportation-infrastructure", title: "Transportation Infrastructure", description: "Design and development of roads, bridges, terminals, and other infrastructure that supports transportation systems." 
                        }, 
                        
                        { 
                            id: "public-transportation", title: "Public Transportation", description: "Study and development of systems such as buses, trains, and other shared transportation services to improve urban mobility." 
                        }, 
                        
                        { 
                            id: "pavement-engineering", title: "Pavement Engineering", description: "Design, evaluation, and maintenance of pavement systems to provide durable and safe road surfaces." 
                        }, 
                        
                        { 
                            id: "transportation-safety", title: "Transportation Safety", description: "Research and application of engineering methods to reduce accidents and improve the safety of transportation systems." 
                        }, 
                        
                        { 
                            id: "intelligent-transportation-systems", title: "Intelligent Transportation Systems", description: "Application of sensors, communication technologies, data, and intelligent systems to improve transportation operations and efficiency." 
                        }, 

                        { 
                            id: "sustainable-transportation", title: "Sustainable Transportation", description: "Development of transportation systems that reduce environmental impact, energy consumption, and emissions while supporting efficient mobility." 
                        } ],
            },

            {
                id: "water-resources",
                name: "Water Resources",
                image: civileng4,
                description:
                    "Water Resources Engineering focuses on the management, development, and protection of water systems.",

                    topics: [ 
                        { 
                            id: "hydrology", title: "Hydrology", description: "Study of the movement, distribution, and properties of water on the Earth's surface and within the atmosphere and subsurface." 
                        }, 
                        { 
                            id: "hydraulic-engineering", title: "Hydraulic Engineering", description: "Application of fluid mechanics principles to the design and management of systems that control and convey water." 
                        }, 
                        
                        { 
                            id: "water-supply-engineering", title: "Water Supply Engineering", description: "Planning and design of systems for collecting, treating, storing, and distributing water for domestic and industrial use."
                         }, 
                         
                         { 
                            id: "flood-management", title: "Flood Management", description: "Development of engineering strategies and infrastructure to predict, control, and reduce the impacts of flooding." 
                        }, 
                        
                        { 
                            id: "drainage-engineering", title: "Drainage Engineering", description: "Design and management of systems for collecting and safely conveying stormwater and excess surface water." 
                        }, 
                        
                        { 
                            id: "water-resources-management", title: "Water Resources Management", description: "Planning and management of water resources to ensure efficient, sustainable, and equitable use of available water." 
                        }, 
                        
                        { 
                            id: "irrigation-engineering", title: "Irrigation Engineering", description: "Design and management of systems used to supply water to agricultural land and improve crop production." 
                        }, 
                        
                        { 
                            id: "hydraulic-structures", title: "Hydraulic Structures", description: "Design and analysis of structures such as dams, spillways, channels, culverts, and weirs used to control and manage water." 
                        }, 
                        
                        { 
                            id: "groundwater-engineering", title: "Groundwater Engineering", description: "Study and management of groundwater systems, including aquifer behavior, extraction, recharge, and protection." 
                        }, 
                        
                        { 
                            id: "water-quality-management", title: "Water Quality Management", description: "Monitoring and management of physical, chemical, and biological properties of water to protect human health and aquatic ecosystems." 
                        } ]
            }
        ]
    },

    {
        id: "petroleum-engineering",
        name: "Petroleum And Gas Engineering",
        image: Petroleum,

        description:
            "Petroleum & Gas Engineering focuses on the exploration, drilling, production, processing, and management of oil and natural gas resources.",

        history:
            "Petroleum and Gas Engineering developed alongside the growth of the modern petroleum industry.",

        majorArea: [
            {
                id: "reservoir-engineering",
                name: "Reservoir Engineering",
                image: petandgas1,
                description:
                    "Reservoir Engineering focuses on understanding and managing underground oil and gas reservoirs.",

                    topics: [ 
                        { 
                            id: "reservoir-characterization", title: "Reservoir Characterization", description: "Study of the geological and physical properties of reservoirs to understand their structure, fluid distribution, and production potential." 
                        }, 
                        
                        { 
                            id: "reservoir-fluid-properties", title: "Reservoir Fluid Properties", description: "Study of the physical and chemical properties of oil, gas, and water within petroleum reservoirs." 
                        }, 
                        
                        { 
                            id: "reservoir-pressure-analysis", title: "Reservoir Pressure Analysis", description: "Analysis of pressure behavior within reservoirs to evaluate fluid movement, reservoir performance, and production conditions." 
                        
                        }, 
                        
                        { 
                            id: "material-balance", title: "Material Balance Analysis", description: "Application of material balance principles to estimate reservoir properties, fluid volumes, and hydrocarbon reserves." 
                        }, 
                        
                        { 
                            id: "reservoir-simulation", title: "Reservoir Simulation", description: "Use of mathematical and computational models to predict fluid flow and reservoir performance under different production conditions." 
                        }, 
                        
                        { 
                            id: "enhanced-oil-recovery", title: "Enhanced Oil Recovery", description: "Application of advanced techniques such as water flooding, gas injection, and thermal methods to improve hydrocarbon recovery." 
                        }, 
                        
                        { 
                            id: "well-testing", title: "Well Testing", description: "Analysis of pressure and production data from wells to evaluate reservoir properties and performance." 

                        }, 
                        
                        { 
                            id: "reservoir-performance", title: "Reservoir Performance Analysis", description: "Evaluation of reservoir behavior and production trends to support efficient field development and management." 
                        }, 
                        
                        { id: "reserves-estimation", title: "Reserves Estimation", description: "Assessment of the quantity of recoverable oil and gas within a reservoir using geological, engineering, and production data." 

                        }, 
                        
                        { 
                            id: "reservoir-management", title: "Reservoir Management", description: "Planning and optimization of reservoir development and production strategies to maximize recovery while maintaining efficient operations." 
                        } ],
            },

            {
                id: "drilling-engineering",
                name: "Drilling Engineering",
                image: petandgas2,
                description:
                    "Drilling Engineering focuses on planning and executing the drilling of oil and gas wells.",

                    topics: [ 
                        { 
                            id: "drilling-well-design", title: "Drilling and Well Design", description: "Planning and design of wells to achieve safe, efficient, and economical drilling and production operations." 
                        }, 
                        
                        { 
                            id: "drilling-fluid", title: "Drilling Fluids", description: "Study and application of drilling fluids used to control pressure, cool and lubricate the drill bit, and transport rock cuttings to the surface." 
                        }, 
                        
                        { 
                            id: "wellbore-stability", title: "Wellbore Stability", description: "Analysis and management of geological and mechanical factors that can cause wellbore collapse, instability, or formation damage." 
                        }, 
                        
                        { 
                            id: "directional-drilling", title: "Directional Drilling", description: "Techniques used to control the trajectory of a well so that it reaches specific underground targets." 
                        }, 
                        
                        { 
                            id: "horizontal-drilling", title: "Horizontal Drilling", description: "Application of advanced drilling techniques to construct wells that extend horizontally through productive reservoir zones." 
                        }, 
                        
                        { 
                            id: "drilling-hydraulics", title: "Drilling Hydraulics", description: "Study of fluid flow and pressure behavior within the drilling system to optimize circulation and drilling performance." 
                        }, 
                        
                        { 
                            id: "well-control", title: "Well Control", description: "Techniques and procedures used to maintain control of formation pressures and prevent uncontrolled releases of formation fluids." 
                        }, 
                        
                        { 
                            id: "casing-and-cementing", title: "Casing and Cementing", description: "Design and installation of casing and cement systems to support the wellbore, isolate formations, and protect groundwater." 
                        }, 
                        
                        { 
                            id: "drilling-optimization", title: "Drilling Optimization", description: "Application of engineering methods and real-time data to improve drilling speed, efficiency, safety, and overall well performance." 
                        }, 
                        
                        { 
                            id: "drilling-technology", title: "Advanced Drilling Technology", description: "Development and application of modern drilling technologies, tools, sensors, and automated systems for improved well construction." 
                        } ]
            },

            {
                id: "production-engineering",
                name: "Production Engineering",
                image: petandgas3,
                description:
                    "Production Engineering focuses on bringing oil and natural gas from underground reservoirs to the surface efficiently and safely.",

                    topics: [ 
                        { 
                            
                            id: "well-production", title: "Well Production", description: "Study and optimization of processes used to bring oil and gas from the reservoir to the surface efficiently and safely." 
                        }, 
                        
                        { 
                            id: "production-optimization", title: "Production Optimization", description: "Application of engineering methods to improve well productivity, reduce operating costs, and maximize hydrocarbon recovery." 
                        }, 
                        
                        { 
                            id: "artificial-lift", title: "Artificial Lift Systems", description: "Application of mechanical and hydraulic methods such as pumps and gas lift to improve the flow of hydrocarbons from wells." 
                        }, 
                        
                        { 
                            id: "well-completion", title: "Well Completion", description: "Design and installation of equipment and systems required to prepare a drilled well for safe and efficient production." 
                        }, 
                        
                        { 
                            id: "production-logging", title: "Production Logging", description: "Use of downhole measurements and diagnostic tools to evaluate fluid movement and identify production problems within wells." 
                        }, 
                        
                        { 
                            id: "well-stimulation", title: "Well Stimulation", description: "Application of techniques such as hydraulic fracturing and acidizing to improve formation productivity and increase well flow." 
                        }, 
                        
                        { 
                            id: "flow-assurance", title: "Flow Assurance", description: "Study and management of problems such as wax, hydrates, scale, and corrosion that can restrict the flow of hydrocarbons." 
                        }, 
                        
                        { 
                            id: "well-performance-analysis", title: "Well Performance Analysis", description: "Evaluation of production data and well behavior to identify performance limitations and improve production efficiency." 
                        }, 
                        
                        { 
                            id: "production-facilities", title: "Production Facilities", description: "Design and operation of surface facilities used to separate, process, measure, store, and transport produced hydrocarbons." 
                        }, 
                        
                        { 
                            id: "production-surveillance", title: "Production Surveillance", description: "Continuous monitoring and analysis of well and field performance to identify production changes and support operational decisions." 
                        } ]
            },

            {
                id: "petroleum-geology",
                name: "Petroleum Geology",
                image: petandgas4,
                description:
                    "Petroleum Geology focuses on understanding the geological processes that create, store, and trap oil and natural gas.",

                    topics: [ 
                        { 
                            id: "petroleum-geology-basics", title: "Petroleum Geology Fundamentals", description: "Study of the geological processes responsible for the formation, migration, accumulation, and preservation of oil and natural gas." 
                        }, 
                        
                        { 
                            id: "source-rocks", title: "Source Rocks", description: "Study of organic-rich rocks that generate hydrocarbons under suitable temperature, pressure, and geological conditions." 
                        }, 
                        
                        { 
                            id: "reservoir-rocks", title: "Reservoir Rocks", description: "Study of rock properties such as porosity and permeability that determine the ability of rocks to store and transmit hydrocarbons." 
                        },
                        
                        
                        { 
                            id: "petroleum-migration", title: "Petroleum Migration", description: "Study of how hydrocarbons move from source rocks through geological formations toward reservoir and accumulation zones." 
                        }, 
                        
                        { 
                            id: "structural-geology", title: "Structural Geology", description: "Study of geological structures such as folds, faults, and fractures that influence the formation and trapping of hydrocarbon accumulations." 
                        }, 
                        
                        { 
                            id: "petroleum-traps", title: "Petroleum Traps", description: "Study of structural and stratigraphic features that prevent hydrocarbons from migrating further and allow them to accumulate underground." 
                        }, 
                        
                        { 
                            id: "sequence-stratigraphy", title: "Sequence Stratigraphy", description: "Analysis of sedimentary rock sequences and their geological relationships to understand reservoir distribution and basin evolution." 
                        }, 
                        
                        { 
                            id: "basin-analysis", title: "Sedimentary Basin Analysis", description: "Study of the formation, development, and geological history of sedimentary basins where petroleum systems may occur." 
                        }, 
                        
                        { 
                            id: "petroleum-geochemistry", title: "Petroleum Geochemistry", description: "Application of chemistry to analyze organic matter, source rocks, hydrocarbons, and the processes responsible for petroleum generation." 
                        }, 
                        
                        { 
                            id: "petroleum-exploration", title: "Petroleum Exploration", description: "Application of geological and geophysical methods to identify and evaluate areas with potential oil and natural gas accumulations." 
                        } 
                    ]
            }
        ]
    },

    {
        id: "electrical-engineering",
        name: "Electrical Engineering",
        image: electrical,

          description:
          "Electrical & Electronics Engineering focuses on the generation, transmission, distribution, control, and application of electrical energy.",

          history:
          `Electrical & Electronics Engineering focuses on the generation, transmission, control, and application of electrical energy and electronic systems. It plays a vital role in powering industries, developing communication technologies, and creating intelligent devices.

            From electrical power systems and telecommunications to automation, embedded systems, and digital technology, the field drives many of the innovations that shape modern life.

            Today, electrical and electronics engineers are advancing renewable energy, automation, robotics, artificial intelligence, and smart technologies, building a more connected and efficient future.`,

        majorArea: [
            {
                id: "power-systems",
                name: "Power Systems",
                image: elect1,
                description:
                "Power Systems focuses on the generation, transmission, distribution, and utilization of electrical energy.",

                topics: [ { 
                    id: "power-generation", title: "Electrical Power Generation", description: "Study of technologies and systems used to generate electrical energy from conventional and renewable energy sources." 
                }, 
                
                { 
                    id: "power-transmission", title: "Power Transmission", description: "Design and operation of systems used to transmit electrical energy efficiently over long distances." 
                }, 
                
                { 
                    id: "power-distribution", title: "Power Distribution", description: "Study and design of electrical distribution networks that deliver power safely and reliably to consumers."
                 }, 
                 
                 { 
                    id: "power-system-analysis", title: "Power System Analysis", description: "Analysis of electrical power networks to evaluate voltage, current, power flow, stability, and overall system performance."
                 }, 
                 
                 { 
                    id: "power-system-protection", title: "Power System Protection", description: "Development of protective systems that detect faults and isolate damaged sections of electrical networks to prevent equipment damage and outages." 
                }, 
                
                { 
                    id: "power-system-stability", title: "Power System Stability", description: "Study of the ability of power systems to maintain stable operation following disturbances and changes in operating conditions." 
                }, 
                
                { 
                    id: "smart-grids", title: "Smart Grid Systems", description: "Integration of digital technologies, communication systems, automation, and distributed energy resources into modern electrical grids." 
                }, 
                
                { 
                    id: "renewable-power-systems", title: "Renewable Power Systems", description: "Study and integration of renewable energy sources such as solar, wind, and hydroelectric power into electrical networks." 
                }, 
                
                { 
                    id: "power-quality", title: "Power Quality", description: "Study and management of voltage disturbances, harmonics, interruptions, and other factors that affect the quality and reliability of electrical power." 
                
                }, 
                
                { id: "distributed-generation", title: "Distributed Generation", description: "Development and integration of small-scale power generation systems located close to electricity consumers." 

                } ]
            },

            {
                id: "electronics",
                name: "Electronics Engineering",
                image: elect2,
                description:
                "Electronics Engineering focuses on the design and application of electronic circuits and devices.",

                topics: [ 
                    { id: 
                        "electronic-circuits", title: "Electronic Circuits", description: "Design and analysis of electronic circuits used for processing, controlling, and amplifying electrical signals." 
                    }, 
                    
                    { 
                        id: "analog-electronics", title: "Analog Electronics", description: "Study and design of circuits that process continuously varying electrical signals using components such as amplifiers, diodes, and transistors." 
                    }, 
                    
                    { 
                        id: "digital-electronics", title: "Digital Electronics", description: "Design and application of digital circuits that process information using discrete logic signals and digital systems." 
                    }, 
                    
                    
                    { 
                        id: "microelectronics", title: "Microelectronics", description: "Development and application of miniature electronic components and integrated circuits for modern electronic systems." 
                    
                    }, 

                    { 
                        id: "integrated-circuits", title: "Integrated Circuit Design", description: "Design and development of integrated circuits that combine electronic components on a single semiconductor chip." 
                    }, 
                    
                    { 
                        id: "embedded-electronics", title: "Embedded Electronics", description: "Development of electronic systems integrated into machines and devices to perform dedicated monitoring, control, and processing functions." 
                    }, 
                    
                    { 
                        id: "power-electronics", title: "Power Electronics", description: "Application of semiconductor devices and electronic circuits to control, convert, and efficiently manage electrical power."
                     }, 
                     
                     { 
                        id: "electronic-instrumentation", title: "Electronic Instrumentation", description: "Design and application of electronic systems for measuring, monitoring, and controlling physical quantities in engineering applications." 
                    }, 
                    
                    { 
                        id: "signal-processing", title: "Signal Processing", description: "Processing and analysis of electrical signals to extract information, reduce noise, and improve system performance." 
                    
                    }, 
                    
                    { 
                        id: "electronic-communication", title: "Electronic Communication Systems", description: "Study and development of electronic systems used to transmit, receive, and process information through communication channels."
                     } ]
            },

            {
                id: "telecommunications",
                name: "Telecommunication Engineering",
                image: elect3,
                description:
                "Telecommunication Engineering focuses on technologies used to transmit information over communication networks.",

                topics: [ 
                    { 
                        id: "communication-systems", title: "Communication Systems", description: "Study and design of systems used to transmit information between devices and users through wired and wireless communication channels." 
                    }, 
                    
                    { 
                        id: "wireless-communication", title: "Wireless Communication", description: "Development of technologies that transmit voice, data, and multimedia information through wireless networks and radio signals." 
                    }, 
                    
                    { 
                        id: "fiber-optic-communication", title: "Fiber Optic Communication", description: "Use of optical fibers to transmit large amounts of information over long distances with high speed and reliability." 
                    }, 
                    
                    { id: "mobile-communication", title: "Mobile Communication", description: "Study and development of cellular communication technologies that enable users to communicate while moving between network coverage areas." 

                    }, 
                    
                    { 
                        id: "satellite-communication", title: "Satellite Communication", description: "Application of communication satellites to transmit signals over large geographical areas for telecommunications, broadcasting, and data services." 
                    }, 
                    
                    { 
                        id: "radio-frequency-engineering", title: "Radio Frequency Engineering", description: "Design and analysis of systems that operate with radio-frequency signals for wireless communication and other applications." 
                    }, 
                    
                    { 
                        id: "antenna-design", title: "Antenna Design", description: "Design and analysis of antennas used to transmit and receive electromagnetic signals efficiently." 
                    }, 
                    
                    {
                         id: "network-engineering", title: "Telecommunication Network Engineering", description: "Design, deployment, management, and optimization of networks used to transport voice, data, and multimedia information."
                         }, 
                         
                         {
                             id: "5g-and-beyond", title: "5G and Beyond", description: "Research into advanced mobile communication technologies that provide higher data rates, lower latency, improved connectivity, and support for emerging applications." 
                            }, 
                            
                            { id: "communication-signal-processing", title: "Communication Signal Processing", description: "Application of signal processing techniques to improve the quality, reliability, and efficiency of transmitted and received communication signals." } ],
            },

            {
                id: "control-engineering",
                name: "Control Engineering",
                image: elect4,
                description:
                "Control Engineering focuses on developing systems that automatically monitor and regulate machines and processes.",

                topics: [ 
                    { 
                        id: "automatic-control", title: "Automatic Control Systems", description: "Design and development of systems that automatically regulate processes and equipment to achieve desired operating conditions." 
                    }, 
                    
                    { 
                        id: "feedback-control", title: "Feedback Control", description: "Application of feedback principles to monitor system performance and automatically correct deviations from desired conditions." 
                    }, 
                    
                    { 
                        id: "industrial-control", title: "Industrial Control Systems", description: "Development of control systems used to monitor, regulate, and optimize industrial machines and processes." 
                    }, 
                    
                    { 
                        id: "process-control", title: "Process Control", description: "Application of control techniques to maintain desired temperature, pressure, flow, level, and other process variables." 
                    }, 
                    
                    { 
                        id: "robotic-control", title: "Robotic Control", description: "Development of control algorithms that enable robots to perform precise movements, interact with their environment, and complete complex tasks." 
                    }, 
                    
                    { 
                        id: "digital-control", title: "Digital Control", description: "Design and implementation of computer-based control systems for monitoring and regulating modern engineering processes." 
                    }, 
                    
                    { 
                        id: "intelligent-control", title: "Intelligent Control", description: "Application of artificial intelligence, machine learning, and computational techniques to develop adaptive and autonomous control systems." 
                    }, 
                    
                    { 
                        id: "adaptive-control", title: "Adaptive Control", description: "Development of control systems that automatically adjust their parameters in response to changes in system conditions." 
                    }, 
                    
                    { id: "optimal-control", title: "Optimal Control", description: "Development of control strategies that optimize system performance while minimizing energy, cost, time, or other resources."

                     }, 
                     
                     { 
                        id: "control-system-modeling", title: "Control System Modeling and Simulation", description: "Development of mathematical models and computer simulations to analyze, predict, and improve the behavior of control systems." } ]
            }
        ]
    },

    {
        id: "chemical-engineering",
        name: "Chemical Engineering",
        image: chemical,

        description:
        "Chemical Engineering applies chemistry, physics, mathematics, biology, and engineering principles to transform raw materials into useful products.",

        history:
        `Chemical Engineering combines chemistry, mathematics, and engineering to transform raw materials into useful products safely and efficiently. It plays a vital role in industries such as energy, pharmaceuticals, food production, manufacturing, and environmental management.

        From developing fuels and chemicals to designing sustainable production processes, chemical engineers help turn scientific discoveries into real-world solutions.

        Today, the field is driving innovation in renewable energy, biotechnolog`,

        majorArea: [
            {
                id: "chemical-processing",
                name: "Chemical Processing",
                image: chemicaleng1,
                description:
                "Chemical Processing focuses on converting raw materials into useful products through controlled chemical and physical processes.",

                topics: [ 
                    { 
                        id: "chemical-process-design", title: "Chemical Process Design", description: "Design and development of chemical processes that efficiently convert raw materials into useful products." 
                    }, 
                    
                    
                    { id: "reaction-engineering", title: "Chemical Reaction Engineering", description: "Study and design of chemical reactors and reaction processes to achieve efficient and controlled chemical transformations." 

                    }, 
                    
                    { 
                        id: "mass-transfer", title: "Mass Transfer", description: "Study of the movement of chemical components between different phases in industrial separation and processing systems."
                     }, 
                     
                     { 
                        id: "heat-transfer-chemical", title: "Heat Transfer in Chemical Processes", description: "Application of heat transfer principles to heating, cooling, evaporation, and temperature control in chemical processing systems." 
                    }, 
                    
                    { 
                        id: "separation-processes", title: "Separation Processes", description: "Development and application of techniques such as distillation, filtration, absorption, and extraction to separate chemical mixtures." 
                    }, 
                    
                    { 
                        id: "process-control-chemical", title: "Chemical Process Control", description: "Application of monitoring and control systems to maintain safe, stable, and efficient operation of chemical processes." 
                    }, 
                    
                    { 
                        id: "process-optimization", title: "Process Optimization", description: "Application of engineering and computational methods to improve process efficiency, productivity, energy use, and operating costs." 
                    }, 
                    
                    { 
                        id: "chemical-plant-design", title: "Chemical Plant Design", description: "Planning and design of chemical processing facilities, including equipment selection, process layout, safety, and operational requirements." 
                    }, 
                    
                    { 
                        id: "process-safety", title: "Process Safety Engineering", description: "Identification and management of hazards associated with chemical processes to prevent accidents, equipment failures, and environmental damage." 
                    }, 
                    
                    { 
                        id: "sustainable-chemical-processing", title: "Sustainable Chemical Processing", description: "Development of chemical processes that reduce waste, energy consumption, emissions, and environmental impact while maintaining productivity." } ],


            },

            {
                id: "energy-and-fuels",
                name: "Energy & Fuels",
                image: chemicaleng2,
                description:
                "Energy & Fuels focuses on the production, processing, conversion, and efficient use of energy resources and fuels.",

                topics: [ 
                    { 
                        id: "energy-conversion", title: "Energy Conversion", description: "Study of processes and technologies used to convert energy from one form into another for useful applications." 
                    }, 
                    
                    { 
                        id: "fossil-fuels", title: "Fossil Fuels", description: "Study of the production, processing, utilization, and environmental impact of coal, oil, and natural gas." 
                    }, 
                    
                    { 
                        id: "renewable-energy", title: "Renewable Energy", description: "Development and application of energy technologies based on renewable sources such as solar, wind, biomass, and hydropower." 
                    }, 
                    
                    { 
                        id: "fuel-processing", title: "Fuel Processing", description: "Study of methods used to process, refine, and improve fuels for efficient and reliable energy production." 
                    }, 
                    
                    { 
                        id: "combustion-engineering", title: "Combustion Engineering", description: "Study and optimization of combustion processes used to release energy from fuels in engines, boilers, turbines, and industrial systems." 
                    }, 
                    
                    { 
                        id: "energy-storage", title: "Energy Storage Systems", description: "Development and application of technologies for storing energy for later use, including batteries, thermal storage, and hydrogen systems." 
                    }, 
                    
                    { id: "hydrogen-energy", title: "Hydrogen Energy", description: "Study of hydrogen production, storage, transportation, and utilization as a potential low-carbon energy carrier." 

                    }, 
                    
                    { 
                        id: "biofuels", title: "Biofuels", description: "Development and production of fuels derived from biological materials as alternatives to conventional fossil fuels." 
                    }, 
                    
                    { 
                        id: "energy-efficiency", title: "Energy Efficiency", description: "Development of methods and technologies for reducing energy consumption while maintaining or improving system performance." 
                    }, 
                    
                    { 
                        id: "energy-environment", title: "Energy and Environmental Sustainability", description: "Study of strategies for meeting energy demands while reducing emissions, waste, and environmental impacts." } ],
            },

            {
                id: "materials-and-polymers",
                name: "Materials & Polymers",
                image: chemicaleng3,
                description:
                "Materials & Polymers focuses on the development, processing, and application of materials and polymeric substances.",

                topics: [ 
                    { 
                        id: "materials-science", title: "Materials Science", description: "Study of the structure, properties, processing, and performance of engineering materials used in industrial applications." 
                    }, 
                    
                    { 
                        id: "polymer-science", title: "Polymer Science", description: "Study of the structure, properties, synthesis, and behavior of polymers and polymeric materials." 
                    }, 
                    
                    { 
                        id: "polymer-processing", title: "Polymer Processing", description: "Development and optimization of processes used to manufacture products from polymeric materials." 
                    }, 
                    
                    { 
                        id: "composite-materials", title: "Composite Materials", description: "Development and application of materials made by combining two or more different materials to achieve improved mechanical and functional properties." 
                    
                    }, 
                    
                    { 
                        id: "nanomaterials", title: "Nanomaterials", description: "Study and development of materials engineered at the nanoscale to achieve enhanced mechanical, electrical, thermal, and chemical properties." 
                    }, 
                    
                    { 
                        id: "advanced-materials", title: "Advanced Materials", description: "Development of high-performance materials designed for specialized applications in engineering, energy, manufacturing, and technology." 
                    }, 
                    
                    { 
                        id: "material-characterization", title: "Material Characterization", description: "Use of experimental and analytical techniques to determine the structural, mechanical, thermal, and chemical properties of materials." 
                    }, 
                    
                    { 
                        id: "polymer-composites", title: "Polymer Composites", description: "Development of polymer-based composite materials with enhanced strength, durability, thermal performance, and other engineering properties." 
                    
                    }, 
                    
                    { 
                        id: "biodegradable-polymers", title: "Biodegradable Polymers", description: "Research and development of polymeric materials designed to degrade naturally and reduce environmental impact." 
                    }, 
                    
                    ,{ id: "materials-recycling", title: "Materials Recycling", description: "Development of methods for recovering, processing, and reusing engineering materials and polymers to reduce waste and conserve resources." } ]
            },

            {
                id: "environmental-engineering",
                name: "Environmental Engineering",
                image: chemicaleng4,
                description:
                "Environmental Engineering focuses on applying engineering principles to protect the environment and manage pollution.",

                topics: [ 
                    { 
                        id: "environmental-pollution-control", title: "Environmental Pollution Control", description: "Development of engineering methods for preventing, controlling, and reducing pollution of air, water, and land." 
                    }, 
                    
                    { 
                        id: "water-and-wastewater-treatment", title: "Water and Wastewater Treatment", description: "Design and application of treatment processes for removing contaminants from water and wastewater before reuse or discharge." 
                    }, 
                    
                    { 
                        id: "air-pollution-control", title: "Air Pollution Control", description: "Study and development of technologies for monitoring, controlling, and reducing harmful pollutants released into the atmosphere." 
                    }, 
                    
                    { 
                        id: "solid-waste-management", title: "Solid Waste Management", description: "Planning and management of waste collection, treatment, recycling, recovery, and disposal systems." 
                    }, 
                    
                    { 
                        id: "hazardous-waste-management", title: "Hazardous Waste Management", description: "Safe handling, treatment, transportation, and disposal of hazardous materials to protect human health and the environment." 
                    }, 
                    
                    { 
                        id: "environmental-impact-assessment", title: "Environmental Impact Assessment", description: "Evaluation of the potential environmental effects of proposed engineering projects and development activities." 
                    }, 
                    
                    
                    {
                         id: "environmental-remediation", title: "Environmental Remediation", description: "Application of engineering techniques to restore contaminated soil, groundwater, and other environmental systems." 
                        }, 
                        
                        { 
                            id: "climate-change-engineering", title: "Climate Change and Environmental Engineering", description: "Development of engineering strategies for reducing greenhouse gas emissions and adapting infrastructure to changing environmental conditions." 
                        
                        }, 
                        
                        { 
                            id: "sustainable-engineering", title: "Sustainable Environmental Engineering", description: "Development of engineering solutions that conserve resources, reduce environmental impacts, and support long-term environmental sustainability." 
                        }, 
                        
                        { 
                            id: "environmental-monitoring", title: "Environmental Monitoring", description: "Use of scientific instruments and engineering methods to measure and assess environmental conditions and pollution levels." } ]
            }
        ]
    }
];

export default departments