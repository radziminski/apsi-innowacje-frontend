import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import React, { Dispatch, SetStateAction } from 'react';
import { FileEntry, removeFile } from '~/store/slices/CreateIdeaAddedFilesSlice';
import { Heading5 } from '~/components/Text';
import { FlexBox } from '~/components/Box';
import { AiOutlineDelete } from 'react-icons/ai';
import prettyBytes from 'pretty-bytes';
import { ModalOverlay } from '~/components/ModalOverlay';
import { ModalWindow } from '~/components/ModalWindow';
import { RemoveFileModal } from '~/components/Dropzone/RemoveFileModal';

const useFilesListComponent = (
  addedFiles: FileEntry[],
  setFileToRemove: Dispatch<SetStateAction<FileEntry | undefined>>
): JSX.Element => {
  const svgClickHandler = React.useCallback((fileEntry: FileEntry) => {
    setFileToRemove(fileEntry);
  }, []);

  return (
    <ul>
      {addedFiles.map((fileEntry: FileEntry) => (
        <li key={fileEntry.id}>
          <FlexBox>
            <AiOutlineDelete size={18} onClick={() => svgClickHandler(fileEntry)} />
            {fileEntry.file.name} - {prettyBytes(fileEntry.file.size)}
          </FlexBox>
        </li>
      ))}
    </ul>
  );
};

const AddedFilesListBase = (props: { addedFiles: FileEntry[]; className?: string }) => {
  const dispatch = useDispatch();
  const [fileToRemove, setFileToRemove] = React.useState<FileEntry | undefined>(undefined);
  const fileList = useFilesListComponent(props.addedFiles, setFileToRemove);

  const handleRemovalChoice = React.useCallback(
    (confirmRemoval: boolean) => {
      if (confirmRemoval && fileToRemove) {
        dispatch(removeFile(fileToRemove.id));
      }
      setFileToRemove(undefined);
    },
    [fileToRemove]
  );

  return (
    <div className={` ${props.className} dropzone__added-files`}>
      <Heading5>Dodane pliki:</Heading5>
      {fileList}
      {fileToRemove ? ( // need to render it conditionally, because otherwise fade-out appears temporarily on rerenders
        <ModalOverlay isVisible={!!fileToRemove}>
          <ModalWindow>
            <RemoveFileModal handleChoice={handleRemovalChoice} filename={fileToRemove ? fileToRemove.file.name : ''} />
          </ModalWindow>
        </ModalOverlay>
      ) : null}
    </div>
  );
};

export const AddedFilesList = styled(AddedFilesListBase)`
  li {
    margin-top: 5px;
    > div {
      align-items: center;
      svg {
        margin-right: 5px;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.black};
        transition: color 0.2s ease-in-out;
        &:hover {
          transition: color 0.2s ease-in-out;
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;
