import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import React, { Dispatch, SetStateAction } from 'react';
import { FileEntry, removeFile } from '~/store/slices/CreateIdeaAddedFilesSlice';
import Text, { Heading5 } from '~/components/Text';
import { FlexBox } from '~/components/Box';
import { AiOutlineDelete } from 'react-icons/ai';
import prettyBytes from 'pretty-bytes';
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
            <FlexBox>
              <AiOutlineDelete size={18} onClick={() => svgClickHandler(fileEntry)} />
            </FlexBox>
            <Text>{fileEntry.file.name}</Text>
            <Text> - {prettyBytes(fileEntry.file.size)}</Text>
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
        <RemoveFileModal handleChoice={handleRemovalChoice} filename={fileToRemove ? fileToRemove.file.name : ''} />
      ) : null}
    </div>
  );
};

export const AddedFilesList = styled(AddedFilesListBase)`
  ul {
    overflow: hidden;
    li {
      margin-top: 5px;
      > div {
        > span:first-of-type {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        > span:not(:first-of-type) {
          white-space: nowrap;
        }
      }
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
  }
`;
