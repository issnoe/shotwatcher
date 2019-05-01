const styles = theme => ({
    root: {
        overflow: 'hidden',
        padding: `100px ${theme.spacing.unit * 3}px`,
        justifyContent: 'center'
    },
    wrapper: {
        maxWidth: 300,
        margin: '0 auto',
        [theme.breakpoints.up('xs')]: {
            maxWidth: 400,
        },
        justifyContent: 'center'
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
    imgResponsive: {
        position: 'relative',
        maxWidth: '100%',
        margin: '0 auto'
    },
    logo: {
        maxWidth: '100%',
        height: 'auto',
        maxHeight: '100px',
        margin: '0 auto'
    },
    nameLogo: {

        maxWidth: '100%',
        height: 'auto',
        maxHeight: '50px',
        margin: '0 auto'
    },
    button: {
        margin: theme.spacing.unit,
    },
});

export default styles;