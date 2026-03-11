import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from app.models import Worker, WorkerSlot

print("Clearing existing data...")
WorkerSlot.objects.all().delete()
Worker.objects.all().delete()

print("Creating sample professionals...")

workers_data = [
    {
        "name": "Jane Smith",
        "category": "Plumber",
        "rating": 4.8,
        "reviews_count": 124,
        "experience": "10 Years",
        "price": 85,
        "availableNow": True,
        "avatar": "https://i.pravatar.cc/150?img=1",
        "bio": "Experienced plumber specializing in residential leak repairs and pipe installations. Punctual and professional."
    },
    {
        "name": "Michael Chen",
        "category": "Electrician",
        "rating": 4.9,
        "reviews_count": 89,
        "experience": "7 Years",
        "price": 95,
        "availableNow": True,
        "avatar": "https://i.pravatar.cc/150?img=11",
        "bio": "Certified electrician with extensive experience in wiring, panel upgrades, and lighting installations safety codes."
    },
    {
        "name": "Sarah Jenkins",
        "category": "Cleaner",
        "rating": 4.7,
        "reviews_count": 210,
        "experience": "5 Years",
        "price": 40,
        "availableNow": False,
        "avatar": "https://i.pravatar.cc/150?img=5",
        "bio": "Meticulous house cleaner offering deep cleaning, move-in/move-out cleans, and regular maintenance."
    },
    {
        "name": "David Rodriguez",
        "category": "Carpenter",
        "rating": 4.6,
        "reviews_count": 56,
        "experience": "12 Years",
        "price": 75,
        "availableNow": True,
        "avatar": "https://i.pravatar.cc/150?img=8",
        "bio": "Skilled carpenter focused on custom furniture, cabinetry, and general woodwork repairs around the home."
    },
    {
        "name": "Emily Watson",
        "category": "HVAC Technician",
        "rating": 4.9,
        "reviews_count": 142,
        "experience": "8 Years",
        "price": 110,
        "availableNow": True,
        "avatar": "https://i.pravatar.cc/150?img=9",
        "bio": "Expert heating and cooling technician. Available for emergency repairs, seasonal maintenance, and new system installations."
    }
]

slots_to_create = [
    "09:00 AM - 10:00 AM",
    "10:30 AM - 11:30 AM",
    "01:00 PM - 02:00 PM",
    "02:30 PM - 03:30 PM"
]

for data in workers_data:
    worker = Worker.objects.create(**data)
    print(f"Created worker: {worker.name} ({worker.category})")
    
    # Add slots for each worker
    for i, time_slot in enumerate(slots_to_create):
        # Make the last slot booked for some variety, others available
        status = 'booked' if i == len(slots_to_create) - 1 else 'available'
        WorkerSlot.objects.create(
            worker=worker,
            time=time_slot,
            status=status
        )

print("Database successfully populated with sample data!")
