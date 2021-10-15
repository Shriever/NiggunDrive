import { Formik } from 'formik';
import { NextPage } from 'next';
import React, { useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import Wrapper from '../components/Wrapper';
import {
  useGetAwsUploadUrlQuery,
  useUploadNiggunMutation,
} from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

const upload: NextPage = () => {
  const { data, loading } = useGetAwsUploadUrlQuery();
  const [uploadNiggun] = useUploadNiggunMutation();
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState('');

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
            const audio = new Audio(audioUrl);
            await new Promise(resolve => {
              setTimeout(resolve, 1000);
            });

            const response = await uploadNiggun({
              variables: {
                input: {
                  link: audioUrl,
                  length: audio.duration,
                  title: values.title,
                },
              },
              // update: (cache, {data}) => {
              //   cache.writeQuery>()
              // }
            });
            
            if (response.data?.uploadNiggun.errors) {
              setErrors(toErrorMap(response.data.uploadNiggun.errors));
            } else {
              setAlertMessage('Niggun successfully uploaded!');
              setTimeout(() => {
                setAlertMessage('');
              }, 4000);
            }
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
                }
              }}
            />
            {errors ? (
              <span className='text-red-500'>{errors.title}</span>
            ) : null}
            {alertMessage ? <span>{alertMessage}</span> : null}
            <SubmitButton disabled={loading} text='UPLOAD NOW' />
          </form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default upload;
