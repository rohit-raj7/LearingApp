 


import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { assets } from '../../assets/assets';

function AddCourse() {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  // Initialize Quill editor
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write course description...',
      });
    }
  }, []);

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updatedContent = [...chapter.chapterContent];
            updatedContent.splice(lectureIndex, 1);
            return { ...chapter, chapterContent: updatedContent };
          }
          return chapter;
        })
      );
    }
  };

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Title');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleAddLecture = () => {
    const { lectureTitle, lectureDuration, lectureUrl } = lectureDetails;
    if (!lectureTitle || !lectureDuration || !lectureUrl) {
      alert('Please fill all fields');
      return;
    }
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, lectureDetails],
          };
        }
        return chapter;
      })
    );
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className='h-screen overflow-scroll flex flex-col gap-6 md:p-8 p-4 pt-8'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>

        {/* Course Title */}
        <div className='flex flex-col gap-1 mb-4'>
          <label htmlFor='title' className='font-medium'>Course Title</label>
          <input
            id='title'
            type='text'
            value={courseTitle}
            onChange={e => setCourseTitle(e.target.value)}
            placeholder='Type here'
            className='outline-none py-2 px-3 rounded border border-gray-400'
            required
          />
        </div>

        {/* Course Description */}
        <div className='flex flex-col gap-1'>
          <label className='font-medium'>Course Description</label>
          <div ref={editorRef} className='bg-white border border-gray-400 rounded p-2 min-h-[200px]' />
        </div>

        {/* Price and Thumbnail */}
        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(Number(e.target.value))}
              placeholder='0'
              className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
              required
            />
          </div>
          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt="Upload" className='p-3 bg-blue-500 rounded cursor-pointer' />
              <input
                type="file"
                id='thumbnailImage'
                onChange={e => setImage(e.target.files[0])}
                accept='image/*'
                hidden
              />
              {image && <img className='max-h-10' src={URL.createObjectURL(image)} alt="Thumbnail Preview" />}
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input
            type="number"
            min={0}
            max={100}
            value={discount}
            onChange={e => setDiscount(Number(e.target.value))}
            placeholder='0'
            className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
            required
          />
        </div>

        {/* Chapters and Lectures */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapter.chapterId} className='bg-white border rounded-lg mb-4'>
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                  <img
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    alt="Toggle"
                    className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && '-rotate-90'}`}
                  />
                  <span className='font-semibold'>
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                <img
                  onClick={() => handleChapter('remove', chapter.chapterId)}
                  src={assets.cross_icon}
                  alt="Remove Chapter"
                  className='cursor-pointer'
                />
              </div>

              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                      <span>
                        {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                        <a href={lecture.lectureUrl} target='_blank' rel="noreferrer" className='text-blue-500'> Link </a> - 
                        {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                      </span>
                      <img
                        onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                        src={assets.cross_icon}
                        className='cursor-pointer'
                        alt="Remove Lecture"
                      />
                    </div>
                  ))}
                  <div
                    className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'
                    onClick={() => handleLecture('add', chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}

          <div
            onClick={() => handleChapter('add')}
            className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer'
          >
            + Add Chapter
          </div>

          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
              <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

                {['lectureTitle', 'lectureDuration', 'lectureUrl'].map((field, idx) => (
                  <div key={idx} className='mb-2'>
                    <p>{field === 'lectureTitle' ? 'Lecture Title' : field === 'lectureDuration' ? 'Duration (minutes)' : 'Lecture URL'}</p>
                    <input
                      type="text"
                      className='mt-1 block w-full border rounded py-1 px-2'
                      value={lectureDetails[field]}
                      onChange={(e) => setLectureDetails({ ...lectureDetails, [field]: e.target.value })}
                    />
                  </div>
                ))}

                <div className='mb-4'>
                  <p>Is Preview Free</p>
                  <input
                    type="checkbox"
                    className='mt-1 scale-125'
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                  />
                </div>

                <button
                  type='button'
                  onClick={handleAddLecture}
                  className='w-full bg-blue-400 text-white px-4 py-2 rounded'
                >
                  Add
                </button>
                <img
                  onClick={() => setShowPopup(false)}
                  className='absolute top-4 right-4 w-4 cursor-pointer'
                  src={assets.cross_icon}
                  alt="Close"
                />
              </div>
            </div>
          )}
        </div>

        <button type='submit' className='bg-blue-500 text-white px-8 py-2.5 rounded my-4'>ADD</button>
      </form>
    </div>
  );
}

export default AddCourse;


// 6:50