import React from 'react';
import { MdOutlineAccountCircle } from 'react-icons/md';
import DashboardContent from '~/components/DashboardContent/DashboardContent';
import Text from '~/components/Text';
import { useSelector } from '~/store/hooks';

export const AccountDetailsPage: React.FC = () => {
  const { currentUser } = useSelector(state => state.user);
  return (
    <DashboardContent title="Dane użytkownika" icon={<MdOutlineAccountCircle size={28} />}>
      <Text fontSize="1.25rem" lineHeight={2}>
        Imię: {currentUser?.firstName} <br />
        Nazwisko: {currentUser?.lastName} <br />
        Pseudonim: {currentUser?.username} <br />
        Rola: {currentUser?.userRole} <br />
      </Text>
    </DashboardContent>
  );
};

export default AccountDetailsPage;
