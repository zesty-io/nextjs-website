import { Box, Button, Modal, Typography } from '@mui/material';
import ZestyImage from 'blocks/Image/ZestyImage';
import DescriptionIcon from '@mui/icons-material/Description';
import React, { useState } from 'react';

const isImage = (file) => {
  // check based on file extension
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
  return imageExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

const DownloadButton = ({ file }) => {
  const handleDownload = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = file?.previewurl;
    link.download = file?.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: '#F2F2F2',
        borderRadius: 3,
        p: 2,
        maxWidth: 200,
        marginBottom: 0.2,
      }}
    >
      <Typography
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          fontSize: 14,
        }}
      >
        <DescriptionIcon />
        {truncateText(file?.name, 15)}
      </Typography>
    </Button>
  );
};

const Attachment = ({ attachments }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {attachments.map((file) => {
        return (
          <>
            {isImage(file) ? (
              <Box
                onClick={() => handleOpen(file?.previewurl)}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 0.2,
                }}
              >
                <ZestyImage
                  style={{
                    borderRadius: 10,
                    width: '100%',
                    maxWidth: 300,
                  }}
                  alt="test"
                  src={file?.previewurl}
                />
              </Box>
            ) : (
              <DownloadButton file={file} />
            )}
          </>
        );
      })}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            padding: 2,
          }}
          onClick={handleClose}
        >
          <ZestyImage
            style={{
              borderRadius: 10,
              width: '80%',
              // marginBottom: 2,
            }}
            alt="image"
            src={selectedImage}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Attachment;
