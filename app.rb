require 'pry'
require 'sinatra'
require 'sinatra/reloader'

require 'sqlite3'
CONNECTION = SQLite3::Database.new("questions.db")

CONNECTION.execute("CREATE TABLE IF NOT EXISTS questions (id INTEGER PRIMARY KEY, question TEXT, answer TEXT);")
CONNECTION.execute("CREATE TABLE IF NOT EXISTS choices (id INTEGER PRIMARY KEY, question_id INTEGER, choice TEXT, FOREIGN KEY (question_id) REFERENCES questions(id));")

CONNECTION.results_as_hash = true

require_relative 'models/question.rb'