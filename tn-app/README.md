# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### Docker
## Production 
- Build docker image 
    > docker build -t tn-ui-repository:{tag_number} .

- Tag the image to the repository
    > docker tag tn-ui-repository:{tag_number} 917957058161.dkr.ecr.sa-east-1.amazonaws.com/tn-ui-repository

- Logon AWS services
    > aws ecr get-login-password --region sa-east-1 
    > docker login -u AWS -p [BASE64_HASH_FROM_COMMAND_ABOVE] 917957058161.dkr.ecr.sa-east-1.amazonaws.com

- Push image
    > docker push 917957058161.dkr.ecr.sa-east-1.amazonaws.com/tn-ui-repository

- Create new task on AWS ECR (Elastic Container Registry) Service "# tn_front" 

## Production Load Balance
> http://tn-ui-alb-tutorial-1538678504.sa-east-1.elb.amazonaws.com/