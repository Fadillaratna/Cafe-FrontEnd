const styles = {
  rootAppBar: (theme, open) => ({
    display: 'flex',
    height: 80,
    boxShadow: 'none',
    backdropFilter: 'blur(16px)',
    width: `calc(100% - 80px)`,
    color: '#17202A',
    backgroundColor: '#FFFFFF',
    ...{
      borderBottom: '1px solid #CACFD2',
    },
    ...(open && {
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
};

export default styles;
