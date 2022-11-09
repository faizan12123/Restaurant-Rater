import requests
    
URL = 'https://faizansrestaurantrater.com/api/v1/restaurants/57/addReview'

for i in range(100):
    DATA = {
    "name" : "Faizan",
    "review" :f'This is the #{i} scripted review made by Faizan to show DDoS Vulnerability',
    "rating" : 5
    }
    request = requests.post(url = URL, json=DATA, timeout=5).json()
    print(request)