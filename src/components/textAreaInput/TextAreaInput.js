import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, Box, Textarea } from '@chakra-ui/react';
import Asterisk from '../asterisk/Asterisk';

const TextAreaInput = (props) => {
  const { id, errors, rules, register, title, placeholder, defaultValue, hasLabel = true, mb, w, ...rest } = props;

  return (
    <Box w={w}>
      <FormControl {...rest} isInvalid={errors[id]} mb={mb}>
        {hasLabel && <FormLabel htmlFor={id} fontWeight='semibold'>
          {title} <Asterisk isRequired={rules?.['required']} />
        </FormLabel>}
        <Textarea 
            name={id} 
            {...register(id, rules)}
            defaultValue={defaultValue} 
            bgColor="#F1F1F1"
            placeholder={placeholder}
        />
        <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
  
}

export default TextAreaInput;