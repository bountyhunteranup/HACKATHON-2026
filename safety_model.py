import random

# demo safety scores for locations
safety_data = {
    "kankanady": 75,
    "hampankatta": 65,
    "surathkal": 80,
    "lalbagh": 60,
    "kadri": 70
}

def calculate_safety(location):

    location = location.lower()

    if location in safety_data:
        return safety_data[location]

    # if location not found return random score
    # return random.randint(50,85)