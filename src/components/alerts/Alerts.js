import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react'

function Alerts(props) {
  const { isButton, displayText, header, body, buttonLeftText, buttonRightText, popupOpen, setPopupOpen, onSubmit, buttonRightColor } = props;

  const cancelRef = useRef()
  return (
    <>
      { isButton ? (<Button colorScheme={buttonRightColor} id='button-alert' onClick={() => {setPopupOpen(true)}}>{displayText}</Button>) : 
        (<div role='clickable-text' onClick={() => {setPopupOpen(true)}}>{displayText}</div>)}
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={() => {setPopupOpen(false)}}
        isOpen={popupOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {body}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button id='leftButton-popup' ref={cancelRef} onClick={() => {setPopupOpen(false)}}>
              {buttonLeftText}
            </Button>
            <Button id='rightButton-popup' colorScheme={buttonRightColor} onClick={onSubmit} ml={3}>
              {buttonRightText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Alerts;