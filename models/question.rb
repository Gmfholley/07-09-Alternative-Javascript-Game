require_relative "database_class_methods"
require_relative "database_instance_methods"

class Question
  
  include DatabaseInstanceMethods
  extend DatabaseClassMethods
  
  attr_reader :id, :question, :choices, :answer
  
  def initialize(args)
    @id = args["id"]
    @question = args["question"]
    @choices = args["choices"] || get_choices
    @answer = args["answer"]
  end
  
  def get_choices
    @choices = CONNECTION.execute("SELECT * FROM choices WHERE question_id = #{@id};")
  end
  
end