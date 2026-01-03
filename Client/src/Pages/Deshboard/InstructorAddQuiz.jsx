import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaFileUpload, FaCheckCircle, FaQuestionCircle, FaSave } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";

import InstructorNavbar from "../../Layouts/InstructorNavbar";
import { addQuiz } from "../../Helpers/quizApi";

function InstructorAddQuiz() {
  const { state: courseDetails } = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: 0 },
  ]);
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Handlers ---

  const handleQuestionChange = (idx, value) => {
    const updated = [...questions];
    updated[idx].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[optIdx] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIdx, value) => {
    const updated = [...questions];
    updated[qIdx].answer = Number(value);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: 0 },
    ]);
  };

  const removeQuestion = (idx) => {
    if (questions.length === 1) {
        toast.error("You need at least one question!");
        return;
    }
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleDocument = (e) => {
    const file = e.target.files[0];
    if(file) {
        setDocument(file);
        toast.success("File selected: " + file.name);
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!courseDetails?._id) {
      toast.error("Error: No course selected. Please go back.");
      return;
    }

    // Basic Validation
    for(let i=0; i<questions.length; i++){
        if(!questions[i].question.trim()) return toast.error(`Question ${i+1} is empty!`);
        if(questions[i].options.some(opt => !opt.trim())) return toast.error(`Fill all options for Question ${i+1}`);
    }

    setIsLoading(true);
    try {
      // The addQuiz helper handles the FormData and JSON.stringify
      const res = await addQuiz({
        questions,
        document,
        courseId: courseDetails._id,
      });

      if (res?.success) {
        toast.success("Quiz added successfully! 🎉");
        setTimeout(() => navigate(-1), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Quiz creation failed");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <InstructorNavbar />
      
      <div className="min-h-screen bg-base-200 py-10 px-4">
        
        {/* Main Card */}
        <form
          onSubmit={onFormSubmit}
          className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-3xl border-4 border-dashed border-primary/20 overflow-hidden"
        >
            {/* Header */}
            <div className="bg-primary/10 p-6 flex items-center justify-between border-b-2 border-primary/10">
                <div>
                    <h2 className="text-3xl font-black text-primary flex items-center gap-2">
                        <MdQuiz className="text-4xl"/> Quiz Builder
                    </h2>
                    <p className="text-base-content/60 font-bold ml-1">
                        For Course: <span className="text-secondary">{courseDetails?.title || "Unknown Course"}</span>
                    </p>
                </div>
                <div className="badge badge-secondary badge-lg font-bold">
                    {questions.length} Questions
                </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                
                {/* --- QUESTIONS LIST --- */}
                {questions.map((q, qIdx) => (
                    <div key={qIdx} className="card bg-base-200 border-2 border-base-300 relative group transition-all hover:border-primary/50">
                        
                        {/* Remove Button (Top Right) */}
                        <button
                            type="button"
                            onClick={() => removeQuestion(qIdx)}
                            className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost text-error hover:bg-error/20"
                            title="Delete Question"
                        >
                            <FaTrash />
                        </button>

                        <div className="card-body p-6">
                            
                            {/* Question Input */}
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text font-bold text-lg text-secondary flex items-center gap-2">
                                        <FaQuestionCircle /> Question {qIdx + 1}
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., What is the capital of France?"
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(qIdx, e.target.value)}
                                    className="input input-bordered input-primary w-full text-lg rounded-xl"
                                    autoFocus={qIdx === questions.length - 1} // Auto focus new questions
                                />
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className="flex items-center gap-2">
                                        
                                        {/* Custom Radio Button for Correct Answer */}
                                        <div className="tooltip" data-tip="Mark as Correct Answer">
                                            <input 
                                                type="radio" 
                                                name={`correct-answer-${qIdx}`} 
                                                className="radio radio-success radio-lg"
                                                checked={q.answer === oIdx} 
                                                onChange={() => handleAnswerChange(qIdx, oIdx)}
                                            />
                                        </div>

                                        {/* Option Text Input */}
                                        <input
                                            type="text"
                                            placeholder={`Option ${oIdx + 1}`}
                                            value={opt}
                                            onChange={(e) => handleOptionChange(qIdx, oIdx, e.target.value)}
                                            className={`input input-bordered w-full rounded-full ${q.answer === oIdx ? 'input-success border-2 font-bold' : ''}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- ACTIONS AREA --- */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-4 border-t-2 border-dashed border-base-300">
                    
                    {/* Add Question Button */}
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="btn btn-outline btn-secondary btn-wide rounded-full border-2 hover:bg-secondary hover:text-white"
                    >
                        <FaPlus /> Add Another Question
                    </button>

                    {/* File Upload Area */}
                    <div className="w-full md:w-auto">
                        <label className="btn btn-ghost border-2 border-dashed border-gray-400 text-gray-500 hover:border-primary hover:text-primary rounded-xl h-auto py-3 gap-2 normal-case">
                            <FaFileUpload size={20} />
                            <div className="text-left">
                                <span className="block font-bold text-sm">Attach PDF/Resource</span>
                                <span className="block text-xs font-normal opacity-70">{document ? document.name : "Optional (Max 5MB)"}</span>
                            </div>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={handleDocument}
                            />
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-lg w-full rounded-full shadow-lg text-white text-xl font-bold hover:scale-[1.01] transition-transform"
                >
                    {isLoading ? <span className="loading loading-spinner"></span> : <><FaSave /> Publish Quiz</>}
                </button>

            </div>
        </form>
      </div>
    </>
  );
}

export default InstructorAddQuiz;