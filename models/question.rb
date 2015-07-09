require_relative "database_class_methods"
require_relative "database_instance_methods"

class Question
  
  attr_reader :id, :question, :choices, :answer
  
  def initialize(args)
    @question = args["question"]
    @choices = args["choices"] || []
    @answer = args["answer"]
    @id = args["id"]
  end
  
  def get_choices
    
  end
  
end