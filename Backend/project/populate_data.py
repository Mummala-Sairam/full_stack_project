import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from app.models import Worker, WorkerSlot

def populate():
    # Clear existing if any
    Worker.objects.all().delete()
    
    workers_data = [
        {
            "name": "Amit Sharma",
            "category": "Plumber",
            "rating": 4.8,
            "reviews_count": 120,
            "experience": "8 Years",
            "price": 500,
            "availableNow": True,
            "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
            "bio": "Expert in fixing leaks, pipe installations, and general plumbing repairs."
        },
        {
            "name": "Priya Singh",
            "category": "Electrician",
            "rating": 4.9,
            "reviews_count": 210,
            "experience": "10 Years",
            "price": 600,
            "availableNow": True,
            "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
            "bio": "Certified electrician dealing with home wiring, appliance repair, and short circuits."
        },
        {
            "name": "Rajesh Kumar",
            "category": "Carpenter",
            "rating": 4.5,
            "reviews_count": 85,
            "experience": "5 Years",
            "price": 800,
            "availableNow": False,
            "avatar": "https://randomuser.me/api/portraits/men/45.jpg",
            "bio": "Specialist in wooden furniture repair, custom cabinets, and door fixes."
        },
        {
            "name": "Sneha Reddy",
            "category": "Cleaning",
            "rating": 4.7,
            "reviews_count": 300,
            "experience": "6 Years",
            "price": 1000,
            "availableNow": True,
            "avatar": "https://randomuser.me/api/portraits/women/68.jpg",
            "bio": "Professional deep cleaning services for homes and offices."
        }
    ]

    for data in workers_data:
        worker = Worker.objects.create(**data)
        
        # Add a couple of slots for each worker
        WorkerSlot.objects.create(worker=worker, time="09:00 AM - 10:00 AM", status="available")
        WorkerSlot.objects.create(worker=worker, time="10:00 AM - 11:00 AM", status="available")
        WorkerSlot.objects.create(worker=worker, time="11:00 AM - 12:00 PM", status="available")
        WorkerSlot.objects.create(worker=worker, time="02:00 PM - 03:00 PM", status="booked")
        
        print(f"Added worker: {worker.name} with 4 slots.")

if __name__ == '__main__':
    print("Populating database...")
    populate()
    print("Populating complete!")
