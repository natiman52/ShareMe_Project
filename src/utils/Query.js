
export const searchTerm = (searchTerm) =>{
    const query = `*[_type == "pin" && title match "${searchTerm}*" || category match "${searchTerm}*" || about match "${searchTerm}*" ]{
        image {
            asset ->{
                url
            }
        },
        _id,
        destination,
        postedby -> {
            _id,
            username,
            image
        },
        save[] {
            _key,
            postedby -> {
                _id,
                username,
                image
            },
        },
    }`
    return query
}

export const FeedQuery = `*[_type == "pin"] | order(_createAt desc){
    image {
        asset ->{
            url
        }
    },
    _id,
    destination,
    postedby -> {
        _id,
        username,
        image
    },
    save[] {
        _key,
        postedby -> {
            _id,
            username,
            image
        },
    },
}`


export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedby->{
        _id,
        username,
        image
      },
     save[]{
        postedby->{
          _id,
          username,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedby->{
          _id,
          username,
          image
        },
      }
    }`;
    return query;
  };
  
  export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedby->{
        _id,
        username,
        image
      },
      save[]{
        _key,
        postedby->{
          _id,
          username,
          image
        },
      },
    }`;
    return query;
  };
  
  export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              destination,
              postedby->{
                _id,
                username,
                image
              },
              save[]{
                _key,
                postedby->{
                  _id,
                  username,
                  image
                },
              },
            }`;
    return query;
  };
  
  export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
  };
  
  export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userid == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedby->{
        _id,
        username,
        image
      },
      save[]{
        postedby->{
          _id,
          username,
          image
        },
      },
    }`;
    return query;
  };
  
  export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userid ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedby->{
        _id,
        username,
        image
      },
      save[]{
        postedby->{
          _id,
          username,
          image
        },
      },
    }`;
    return query;
  };
  