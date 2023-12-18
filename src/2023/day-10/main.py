import sys
from math import floor

new_limit = 500_000_000  # Set your desired recursion limit here
sys.setrecursionlimit(new_limit)

def read_lines(file_name):
    with open(file_name) as file:
        return list(map(str.strip, file.readlines()))

# Set the new recursion limit



    
NORTH = (-1, 0)
EAST = (0, 1)
SOUTH = (1, 0)
WEST = (0, -1)

direction_map = {
    "|": [NORTH, SOUTH],
    "-": [EAST, WEST],
    "L": [NORTH, EAST],
    "J": [NORTH, WEST],
    "7": [SOUTH, WEST],
    "F": [SOUTH, EAST],
    ".": [],
    "S": [NORTH, EAST, SOUTH, WEST],
}

def find_char(grid, char):
    for i, row in enumerate(grid):
        for j, c in enumerate(row):
            if c == char:
                return i, j

def part_one(grid):
    animal_pos = find_char(grid, "S")
    done_visiting = {}
    cycle_len = 0

    def dfs(start, parent, path_len):
        nonlocal cycle_len
        i, j = start
        outside = not (0 <= i < len(grid) and 0 <= j < len(grid[0]))
        done = done_visiting.get(start, None)
        if outside or (done is True):
            return
        if done is False:
            cycle_len = max(cycle_len, path_len)
            return
        done_visiting[start] = False
        for di, dj in direction_map[grid[i][j]]:
            neigh = (i + di, j + dj)
            if neigh != parent:
                dfs(neigh, start, path_len + 1)
        done_visiting[start] = True

    dfs(animal_pos, None, 1)
    return floor(cycle_len/2)

# grid = read_lines("example.txt")
grid = read_lines("input.txt")
print("part one answer", part_one(grid))    