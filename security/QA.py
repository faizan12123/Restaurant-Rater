from selenium import webdriver
from selenium.webdriver.support.ui import Select
import time
from selenium.webdriver.common.by import By

driver = webdriver.Chrome("security/chromedriver.exe")
driver.get("https://faizansrestaurantrater.com/login")

#logging into the restaurant rater app
def login (username, password):
    username_field = driver.find_element("name", "email")
    password_field = driver.find_element("name", "password")
    username_field.send_keys(username)
    password_field.send_keys(password)
    login_button = driver.find_element("css selector", "button[type='submit']")
    login_button.click()

#adding a restaurant into the restaurant list
def add_restaurant ():
    time.sleep(1)

    restaurant_name_input = driver.find_element(By.XPATH, "//div/div/div[2]/form/div/div[1]/input")
    restaurant_name_input.send_keys("Created Using Selenium")
    
    restaurant_location_input = driver.find_element(By.XPATH, "//div/div/div[2]/form/div/div[2]/input")
    restaurant_location_input.send_keys("Selenium")
    
    restaurant_price_dropdown = driver.find_element(By.XPATH, "//div/div/div[2]/form/div/div[3]/select")
    select_restaurant_price = Select(restaurant_price_dropdown)
    select_restaurant_price.select_by_value("5")

    restaurant_add_button = driver.find_element(By.XPATH, "//div/div/div[2]/form/div/div[4]/button")
    restaurant_add_button.click()

#Function for leaving reviews
def leave_review ():
    time.sleep(1)

    #opening the restaurant
    open_restaurant = driver.find_element(By.XPATH, "//*[text()='Created Using Selenium']")
    open_restaurant.click()

    #leaving 10 reviews
    for i in range(10):
        time.sleep(1)
        rating_dropdown = driver.find_element(By.ID, "rating")
        select_rating = Select(rating_dropdown)
        select_rating.select_by_value("5")

        restaurant_review = driver.find_element(By.ID, "Review")
        restaurant_review.send_keys(f"#{i+1} I am writing this review using a selenium bot created by Faizan")

        review_submit_button = driver.find_element(By.XPATH, "//*[text()='Submit']")
        review_submit_button.click()

#running all the scripts
def run_script(email, password):
    login(email, password)
    add_restaurant()
    leave_review()
    time.sleep(600) #Delay for 10 minutes
    driver.close()

run_script("test@gmail.com", "pass123")