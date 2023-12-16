from math import sqrt, ceil, floor
import re

# 34454850
def parse_input(file_name):
    with open(file_name, "r") as input_file:
        [ts, ds] = input_file.readlines()
        time = int(re.sub(r"[^0-9]", "", ts))
        dist = int(re.sub(r"[^0-9]", "", ds))
        return time, dist
    
def find_win_ways(time, dist):
    # x(t-x) > d
    # x**2-tx+d<0
    # solving x**2-tx+d=0
    # x = (t +- sqrt(t**2-4d))/2
    root_term = sqrt(time**2-4*dist)
    start = ceil((time-root_term)/2)
    end = floor((time+root_term)/2)
    return end - start + 1

    
time, dist = parse_input("./src/2023/day-6/input.txt")
print(find_win_ways(time, dist))