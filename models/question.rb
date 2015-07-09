require_relative "database_class_methods"
require_relative "database_instance_methods"

class Question
  
  include DatabaseInstanceMethods
  extend DatabaseClassMethods
  
  attr_reader :id, :question, :choices, :answer
  # TODO - There is no verification that @answer is in @choices.  Could break.  Badly.
  # Data types for attributes:
  # id => Integer
  # question => String
  # choices => Array of Hashes
  # answer => Integer
  def initialize(args)
    @id = args["id"]
    @question = args["question"]
    @choices = args["choices"] || get_choices
    @answer = args["answer"]
  end
  # This gets rows from the choices table where the question_id is equal to this Object's id
  # 
  # Returns an Array of Hashes containing the choices.
  def get_choices
    @choices = CONNECTION.execute("SELECT * FROM choices WHERE question_id = #{@id};")
  end
  # This gets the index of the answer from the choices Array, and adds 1 to the index value.
  # 
  # Returns an Integer of the Array index + 1.
  def get_answer_index
    (self.choices.index{|choice| choice["id"] == self.answer.to_i}) + 1 
  end
  
end