import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import {
  AccountsHeader,
  AccountsPopover,
  AccountsTable,
  AccountsTableHead,
  accountsValidations,
  DeleteMsg,
  ErrorMsg,
  FormInput,
  FormSelect,
  SubmitBtn,
} from 'components/accounts';
import { ComboBox } from 'components/globals/ComboBox';
import { useFormik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useZestyStore } from 'store';
import { gravatarImg } from 'utils';

const MySwal = withReactContent(Swal);

const CustomTable = ({
  viewTeamMemberModals,
  loading,
  data,
  handleDeleteTeamModal,
  cta,
  handleAddTeamMemberModal,
}) => {
  const ROWS = data?.map((e) => {
    return {
      ...e,
      id: e.ZUID,
    };
  });

  const handleAddTeamMembers = (data) => {
    handleAddTeamMemberModal(data);
  };
  const COLUMNS = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
      editable: false,
      sortable: false,
      renderHeader: () => <AccountsTableHead>Team Name</AccountsTableHead>,
      renderCell: (params) => {
        return <Typography variant="body2">{params.row.name}</Typography>;
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 600,
      editable: false,
      sortable: false,
      renderHeader: () => <AccountsTableHead>Description</AccountsTableHead>,
      renderCell: (params) => {
        return (
          <Typography variant="body2">{params.row.description}</Typography>
        );
      },
    },
    {
      field: 'action',
      headerName: '',
      width: 110,
      editable: false,
      sortable: false,
      renderCell: (params) => {
        const data = params.row;
        const action = [
          {
            title: 'Add Team Members',
            action: () => handleAddTeamMembers(data),
          },
          {
            title: 'View Team Members',
            action: () => viewTeamMemberModals(data),
          },
          {
            title: 'Delete Team',
            action: () => handleDeleteTeamModal({ ZUID: data.ZUID }),
          },
        ];
        return (
          <AccountsPopover
            title={
              <Button variant="text" color="primary">
                <MoreVertIcon color="disabled" />
              </Button>
            }
            id={'actions'}
            items={action}
            colorInvert={false}
          />
        );
      },
    },
  ];
  return (
    <Stack p={4}>
      <AccountsTable
        loading={loading}
        rows={ROWS}
        columns={COLUMNS}
        pageSize={100}
        autoHeight={false}
        NoData={cta}
      />
    </Stack>
  );
};

const AddUserToTeamForm = ({ onSubmit, data }) => {
  const formik = useFormik({
    validationSchema: accountsValidations.addTeamMember,
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      const newVal = {
        teamZUID: data.ZUID,
        admin: false,
        inviteeEmail: values.email,
      };
      await onSubmit(newVal);
      formik.resetForm();
    },
  });

  return (
    <Box paddingY={4}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <FormInput label="Email" name={'email'} formik={formik} />
        <SubmitBtn loading={formik.isSubmitting} disabled={formik.isSubmitting}>
          Submit
        </SubmitBtn>
      </form>
    </Box>
  );
};

const CustomForm = ({ onSubmit, options = [], allTeams = [] }) => {
  const [teamZUID, setteamZUID] = React.useState('');
  const formik = useFormik({
    validationSchema: accountsValidations.teams,
    initialValues: {
      roleZUID: '',
    },
    onSubmit: async (values) => {
      const newVal = { ...values, teamZUID };
      await onSubmit(newVal);
      formik.resetForm();
    },
  });

  const newOptions = options?.map((e) => {
    return { ...e, value: e.ZUID };
  });

  return (
    <Box paddingY={4}>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Box paddingBottom={1}>
          <ComboBox
            initialLabel={'Select Teams'}
            width={1}
            instances={allTeams}
            setCookies={setteamZUID}
            instanceZUID={''}
            size="medium"
          />
        </Box>
        <FormSelect
          label="Role ZUID"
          name={'roleZUID'}
          formik={formik}
          options={newOptions}
        />
        <SubmitBtn
          loading={formik.isSubmitting}
          disabled={!teamZUID || formik.isSubmitting}
        >
          Submit
        </SubmitBtn>
      </form>
    </Box>
  );
};

const Main = ({
  teams,
  getAllInstancesTeams,
  deleteTeamToInstance,
  isInstanceOwner,
  addTeamToInstance,
  instanceRoles,
  loading,
  allTeams,
  instanceUserWithRoles,
  createTeamInvite,
}) => {
  const { ZestyAPI } = useZestyStore((state) => state);
  const handleAddTeamToInstance = async (data) => {
    await addTeamToInstance(data);
    await getAllInstancesTeams();
  };

  const handleDeleteTeamModal = async ({ ZUID }) => {
    const action = async () => {
      await deleteTeamToInstance(ZUID);
    };
    DeleteMsg({ title: 'Delete this team?', action });
    await getAllInstancesTeams();
  };

  const handleAddTeamModal = () => {
    MySwal.fire({
      title: 'Add Team to Instance',
      html: (
        <CustomForm
          onSubmit={handleAddTeamToInstance}
          options={instanceRoles}
          allTeams={allTeams}
        />
      ),
      showConfirmButton: false,
    });
  };

  const handleAddTeamMemberModal = (data) => {
    MySwal.fire({
      title: 'Add Team Members',
      html: <AddUserToTeamForm onSubmit={createTeamInvite} data={data} />,
      showConfirmButton: false,
    });
  };

  const getTeamMembersSuccess = (res) => {
    const rows = res?.data?.map((e) => {
      return { ...e, id: e.ZUID };
    });

    const COLUMNS = [
      {
        field: 'id',
        headerName: 'ID',
        hide: true,
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 270,
        editable: false,
        sortable: false,
        renderHeader: () => <Typography variant="body1">Name</Typography>,
        renderCell: (params) => {
          const name = `${params.row.firstName} ${params.row.lastName}`;
          const email = `${params.row.email}`;
          const profileUrl = gravatarImg(params?.row);
          return (
            <Stack direction="row" alignItems={'center'} gap={2}>
              <img
                src={profileUrl}
                alt="User"
                height={40}
                width={40}
                style={{ borderRadius: '50%' }}
              />
              <Stack textAlign={'left'}>
                <Typography variant="body2">{name}</Typography>
                <Typography variant="caption" color={'GrayText'}>
                  {email}
                </Typography>
              </Stack>
            </Stack>
          );
        },
      },
    ];

    MySwal.fire({
      title: 'Team Members',
      html: (
        <Stack p={4}>
          <AccountsTable
            loading={false}
            rows={rows}
            columns={COLUMNS}
            pageSize={100}
            autoHeight={true}
          />
        </Stack>
      ),
      showConfirmButton: false,
    });
  };

  const getTeamMembersError = (res) => {
    ErrorMsg({ title: res.error });
  };

  const getTeamMembers = async (teamZUID) => {
    const res = await ZestyAPI.getTeamMembers(teamZUID);
    !res.error && getTeamMembersSuccess(res);
    res.error && getTeamMembersError(res);
  };

  const viewTeamMemberModals = async (data) => {
    await getTeamMembers(data.ZUID);

    // old members
    // const teamMembers = instanceUserWithRoles?.filter(
    //   (e) => e.teamZUID === data.ZUID,
    // );
  };

  const headerProps = {
    title: 'Teams',
    description: `Manage your Teams`,
  };

  const Nodata = () => {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Typography variant="h5">No Results</Typography>
      </Stack>
    );
  };
  return (
    <Grid container>
      <AccountsHeader {...headerProps}>
        {isInstanceOwner && (
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddTeamModal}
            startIcon={<AddIcon />}
          >
            Add Team to Instance
          </Button>
        )}
      </AccountsHeader>
      <Grid item xs={12}>
        <CustomTable
          handleAddTeamMemberModal={handleAddTeamMemberModal}
          viewTeamMemberModals={viewTeamMemberModals}
          instanceUserWithRoles={instanceUserWithRoles}
          loading={loading}
          data={teams}
          handleDeleteTeamModal={handleDeleteTeamModal}
          isInstanceOwner={isInstanceOwner}
          cta={Nodata}
        />
      </Grid>
      {/* <BaseRolesTable /> */}
    </Grid>
  );
};
export const Teams = React.memo(Main);
