interface BookFormErrors {
  artist: string;
}

const useForm = () => {
  function validate(values: { artist: string }) {
    const errors: BookFormErrors = { artist: '' };

    if (!values.artist || values.artist.trim() === '') {
      errors.artist = "Artist name is required";
    }

    const hasErrors = Object.values(errors).some(error => error !== '');
    return { errors, hasErrors };
  }

  return { validate };
}

export default useForm;

