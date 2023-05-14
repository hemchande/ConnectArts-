import { useState } from 'react';
import { Popover, Typography, Button } from '@material-ui/core';

function SkillDescription({ skillName, description }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleButtonClick = (event) => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Button variant="text" onClick={handleButtonClick}>
        {skillName}
      </Button>
      <Popover
        open={isPopoverOpen}
        onClose={handlePopoverClose}
        
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography>{description}</Typography>
      </Popover>
    </>
  );
}

export default SkillDescription;