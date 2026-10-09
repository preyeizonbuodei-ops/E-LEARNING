import pandas as pd

students = {
    "names": [
        "Prince",
        "Michael",
        "Rose",
        "Evelyn",
        "Great"
    ],

    "department": [
        "Mechanical",
        "Mechatronics",
        "Chemical",
        "Civil",
        "Electrical"
    ],

    "scores": [
        60,
        90,
        100,
        44,
        23
    ]
}

df = pd.DataFrame(students)

print(df.tail)