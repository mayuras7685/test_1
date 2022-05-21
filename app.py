import flask
from flask import Flask, render_template, request, json, jsonify, url_for, flash, redirect
from flask_cors import CORS

app = Flask(__name__, static_url_path = '/static/')
CORS(app)

@app.route('/')
def login():
	return app.send_static_file('Login/index.html')

@app.route('/checklogin', methods=['POST'])
def checklogin():
	print (request.get_json(force=True))
	# password = request.form['password']
	# if user in ['Anish', 'Leonie', 'Vineet'] and password in ['Anish', 'Leonie', 'Vineet']:
	# 	return redirect(url_for('dashboard'))
	# flash("Unauthorized Officer!")
	# return app.send_static_file('Login/index.html')

@app.route('/dashboard')
def dashboard():
	return app.send_static_file('Dashboard/index.html')

@app.route('/identify')
def identify():
	return app.send_static_file('Identify/index.html')

@app.route('/manage')
def manage():
	return app.send_static_file('Manage/index.html')

# @app.route('/snapshot'):

if __name__ == '__main__':
	app.run(host = 'localhost', port = 8000, debug = True)
	