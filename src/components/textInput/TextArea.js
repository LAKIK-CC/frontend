import React from 'react';
import { FormControl, FormLabel, FormErrorMessage, Box, Textarea } from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import Asterisk from '../asterisk/Asterisk';
import './style.css'

const TextInput = (props) => {
  const { id, errors, rules, register, title, placeholder, defaultValue, hasLabel = true, mb, w, ...rest } = props;

  return (
    <Box w={w}>
      <FormControl {...rest} isInvalid={errors[id]} mb={mb}>
        {hasLabel && <FormLabel htmlFor={id} fontWeight='semibold'>
          {title} <Asterisk isRequired={rules?.['required']} />
        </FormLabel>}
        <Textarea 
            id={id}
            title={title}
            placeholder={placeholder}
            {...register(id, rules)}
        />
        <FormErrorMessage>{errors[id] && errors[id].message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
  
}

export default TextInput;