INSERT INTO department (name)
VALUES  ('Sales'),
        ('Engineering'),
        ('Legal'),
        ('Finance');

INSERT INTO roles (title, department_id, salary)
VALUES  ('Senior Sales Rep', 1, '120000'),
        ('Sales Rep', 1, '120000'),
        ('CPA', 4, '140000'),
        ('Accountant', 4, '80000'),
        ('Senior Laywer', 3, '230000'),
        ('Lawyer', 3, '110000'),
        ('Senior Sofrware Engineer', 2, '240000'),
        ('Software Engineer', 2, '100000');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Elizabeth", "Turner", 7, NULL),
        ("Junho", "Kim", 8, 1),
        ("Susan", "Bleedingbone", 1, NULL),
        ("Tomas", "Herland", 2, 3),
        ("William", "Lionheart", 5, NULL),
        ("Hilda", "White", 6, 5),
        ("James", "Eldabreath", 3, NULL),
        ("Jasmine", "Tuch", 4, 7);