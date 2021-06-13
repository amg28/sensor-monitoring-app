
# Set the working directory to /sensor-monitoring-app
WORKDIR /sensor-monitoring-app
# copy package.json into the container at /sensor-monitoring-app
COPY package*.json /sensor-monitoring-app/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /sensor-monitoring-app
COPY . /sensor-monitoring-app/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]
