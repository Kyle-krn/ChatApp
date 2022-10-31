### content of "create_user.py" file
from django.contrib.auth import get_user_model

# see ref. below
UserModel = get_user_model()

if not UserModel.objects.filter(username='foo1').exists():
    user=UserModel.objects.create_user('foo1', password='bar')
    user.is_superuser=True
    user.is_staff=True
    user.save()