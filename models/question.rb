class Question
  
  def inititalize(args)
    @question = args["question"]
    @choices = args["choices"] || []
    @answer = args["answer"]
    @id = args["id"]
  end
  
end