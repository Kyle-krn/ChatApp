### content of "create_user.py" file
# cat IlStudioChat/create_user.py | python manage.py shell
from django.contrib.auth import get_user_model
import sys

UserModel = get_user_model()

users_data = [
    {
        'username': 'jhon',
        'password': 'pass123'
    },
    {
        'username': 'leon',
        'password': 'pass123'
    },
    {
        'username': 'baker',
        'password': 'pass123'
    },
    {
        'username': 'lilia',
        'password': 'pass123'
    },
    {
        'username': 'aizek',
        'password': 'pass123'
    },
    {
        'username': 'mila',
        'password': 'pass123'
    },
    {
        'username': 'sins',
        'password': 'pass123'
    },
]

for user_data in users_data:
    if not UserModel.objects.filter(username=user_data['username']).exists():
        UserModel.objects.create_user(user_data['username'], password=user_data['password'])