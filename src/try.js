return (
  <>
    {
      (() => {
        switch (permission) {
          case 1:
            return <TeacherNav />;
          case 2:
            return <CoordinateNav />;
          case 3:
            return <AdminNav />;
          default:
            return <UnidentifiedUserNav />;
        }
      })()
    }
  </>
);