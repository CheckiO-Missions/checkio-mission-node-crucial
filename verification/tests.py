"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [[
                ['A', 'B'],
                ['B', 'C']
            ],{
                'A': 10,
                'B': 10,
                'C': 10
            }],
            "answer": ['B'],
            "explanation": [
                "Node B is the most crucial here because it separates network on two subnetworks",
                ['',  '',   '',   '',   '',
                 '', 'A',   '',  'C',   '',
                 '',  '',  'B',   '',   '',
                 '',  '',   '',   '',   '',
                 '',  '',   '',   '',   ''],
            ],
        },
        {
            "input": [[
                ['A', 'B']
            ],{
                'A': 20,
                'B': 10
            }],
            "answer": ['A'],
            "explanation": [
                "Node A has more users on it",
                ['',  '',   '',  '',   '',
                 '',  '',   '',  '',   '',
                 '',  'A', '',  'B',   '',
                 '',  '',   '',  '',   '',
                 '',  '',   '',  '',   ''],
            ],
        },
        {
            "input": [[
                ['A', 'B'],
                ['A', 'C'],
                ['A', 'D'],
                ['A', 'E']
            ],{
                'A': 0,
                'B': 10,
                'C': 10,
                'D': 10,
                'E': 10
            }],
            "answer": ['A'],
            "explanation": [
                "A doesn't have users connected but it is in the center of the network",
                ['',  '',   '',   '',   '',
                 '', 'B',   '',  'C',   '',
                 '',  '',  'A',   '',   '',
                 '', 'D',   '',  'E',   '',
                 '',  '',   '',   '',   ''],
            ],
        },
        {
            "input": [[
                ['A', 'B'],
                ['B', 'C'],
                ['C', 'D']
            ],{
                'A': 100,
                'B': 1,
                'C': 97,
                'D': 1
            }],
            "answer": ['A'],
            "explanation": [
                "C has more connections, but A has more users",
                ['',  '',   '',   '',   '',
                 'A', '',  'C',   '',   '',
                 '', 'B',   '',  'D',   '',
                 '',  '',   '',   '',   '',
                 '',  '',   '',   '',   ''],
            ],
        },
        {
            "input": [[
                ['A', 'B'],
                ['B', 'C'],
                ['C', 'D']
            ],{
                'A': 10,
                'B': 20,
                'C': 10,
                'D': 20
            }],
            "answer": ['B'],
            "explanation": [
                "well, it has some math behind it",
                ['',  '',   '',   '',   '',
                 'A', '',  'C',   '',   '',
                 '', 'B',   '',  'D',   '',
                 '',  '',   '',   '',   '',
                 '',  '',   '',   '',   ''],
            ],
        }
    ],
    "Extra": [
        {
            "input": [[
                ['A', 'B'],
                ['B', 'C'],
                ['C', 'A']
            ],{
                'A': 10,
                'B': 5,
                'C': 10
            }],
            "answer": ['A', 'C'],
            "explanation": [
                "All 3 nodes are connected in a circle but A and C have the most amount of users",
                ['',  '',  '',   '',   '',
                 '',  '', 'A',   '',   '',
                 '', 'B',  '',  'C',   '',
                 '',  '',  '',   '',   '',
                 '',  '',  '',   '',   ''],
            ],
        },
        {
            "input": [[
                ['A', 'B'],
                ['B', 'C'],
                ['B', 'D'],
                ['C', 'E'],
                ['D', 'E'],
                ['E', 'F']
            ],{
                'A': 10,
                'B': 20,
                'C': 15,
                'D': 15,
                'E': 10,
                'F': 20
            }],
            "answer": ['B'],
            "explanation": [
                "You only choosing between B and E. Some math will help to figure which one is the most crucial",
                ['',   '',   '',   '',   '',
                 'A',  '',  'D',   '',   '',
                 '',  'B',   '',  'E',   '',
                 '',   '',  'C',   '',  'F',
                 '',   '',   '',   '',   ''],
            ],
        }
    ]
}
