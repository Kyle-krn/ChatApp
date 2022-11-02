### content of "create_user.py" file
# cat IlStudioChat/create_user.py | python manage.py shell
from django.contrib.auth import get_user_model
import sys

# see ref. below
UserModel = get_user_model()

if not UserModel.objects.filter(username='foo').exists():
    user=UserModel.objects.create_user('foo', password='bar')
    user.is_superuser=True
    user.is_staff=True
    user.save()