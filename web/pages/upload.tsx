import { Formik } from 'formik';
import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';
import { useGetAwsUploadUrlQuery } from '../generated/graphql';

const upload: NextPage = () => {
  const { data, loading } = useGetAwsUploadUrlQuery();
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <Wrapper>
      <Header>Upload Niggun</Header>
      <Formik
        initialValues={{ title: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (!values.title) {
            setErrors({ title: 'Please include a title' });
            return;
          }
          if (!audioFile) {
            setErrors({ title: 'Please provide a valid MP3 file.' });
            return;
          }
          if (data) {
            const { uploadUrl } = data.getAWSUploadUrl;
            await fetch(uploadUrl, {
              method: 'PUT',
              headers: { 'Content-type': 'multipart/form-data' },
              body: audioFile,
            });

            const audioUrl = uploadUrl.split('?')[0];
            console.log(audioUrl);
            const audio = new Audio(audioUrl);
            audio.play();
            // const file = await fetch(audioUrl).then(res => res.json());

            // URL.createObjectURL(file)
          }
        }}
      >
        {({ handleSubmit, values, handleChange, errors }) => (
          <form
            onSubmit={handleSubmit}
            className='max-w-md xl:max-w-sm sm:shadow-xl mx-auto pt-2 mt-4 flex flex-col items-center p-6 py-8'
          >
            <Input
              type='text'
              placeholder='Title'
              name='title'
              value={values.title}
              onChange={handleChange}
            />
            <input
              type='file'
              className='w-4/5 mx-auto my-3'
              onChange={e => {
                const { files } = e.target;
                if (files && files[0]?.type === 'audio/mpeg') {
                  setAudioFile(files[0]);
                  console.log(files[0]);

                  // SECRET SAUCE
                  // const audioUrl = URL.createObjectURL(files[0]);
                  // const audio = new Audio(audioUrl);
                }
              }}
            />
            {errors ? (
              <span className='text-red-500'>{errors.title}</span>
            ) : null}
            <SubmitButton disabled={loading} text='UPLOAD NOW' />
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default upload;
