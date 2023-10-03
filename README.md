# Urine Strip Analysis Using OpenCV

## Installation

Clone the repository and install the requirements

After cloning the repository, run the following command to install the requirements

cd into the server folder and run the following command

```bash
cd server
```

```bash
python -m venv env
```

```bash
source env/bin/activate
```

```bash
pip install -r requirements.txt
```


```bash
cd urine_analyser
```

```bash
python manage.py makemigrations
```

```bash
python manage.py migrate
```


## Usage

To run the server, run the following command

```bash
python manage.py runserver
```

To run the client, 

Open the `client/index.html` file in the client folder using Live Server in VS Code or any other editor


Put the HOST and  ORIGIN on which client side runs in the `server/urine_analyser/urine_analyser/settings.py` file