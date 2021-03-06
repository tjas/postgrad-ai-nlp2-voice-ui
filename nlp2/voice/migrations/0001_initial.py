# Generated by Django 3.2.5 on 2021-07-31 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Credentials',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('api', models.CharField(choices=[('IBM', 'IBM Cloud')], default='IBM', max_length=50, verbose_name='API')),
                ('speech_to_text_key', models.CharField(default='n5Rhc5dogc0-WRVeiHshHMZpesffYJKrOrnOXsX744rF', max_length=250, verbose_name='Speech to Text')),
                ('text_to_speech_key', models.CharField(default='418FoDGsfsb7vRHUN69MHtUQgLXry0SpQmgiOsWhOSO6', max_length=250, verbose_name='Text to Speech')),
            ],
            options={
                'verbose_name': 'Credential',
                'verbose_name_plural': 'Credentials',
                'db_table': 'credentials',
                'ordering': ('api',),
            },
        ),
    ]
