# 存放数据库信息
CREATE TABLE account_log
(
    id            int AUTO_INCREMENT
        PRIMARY KEY,
    user_id       int          NULL,
    user_email    varchar(255) NULL,
    user_name     varchar(255) NULL,
    ip            varchar(255) NULL,
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL
);


CREATE TABLE patient
(
    id           int UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    name         varchar(255) DEFAULT ''                NOT NULL,
    email        varchar(127) DEFAULT ''                NOT NULL COMMENT 'user email',
    passwordHash varchar(255) DEFAULT ''                NOT NULL,
    deleted      tinyint(1)   DEFAULT  0                NOT NULL,
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT email
        UNIQUE (email, name)
);

CREATE TABLE doctor
(
    id           int UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    name         varchar(255) DEFAULT ''                NOT NULL,
    email        varchar(127) DEFAULT ''                NOT NULL COMMENT 'user email',
    passwordHash varchar(255) DEFAULT ''                NOT NULL,
    isValid      tinyint(1)   DEFAULT  0                NOT NULL,
    deleted      tinyint(1)   DEFAULT  0                NOT NULL,
    isOnline      tinyint(1)   DEFAULT  0                NOT NULL COMMENT 'Doctor Online Status',
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT email
        UNIQUE (email, name)
);

CREATE TABLE doctor_info
(
    id           int UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    doctor_id        int          NOT NULL,
    clinic_name        varchar(127) DEFAULT ''                NOT NULL,
    clinic_location varchar(255) DEFAULT ''                NOT NULL,
    certification varchar(255) DEFAULT ''                NOT NULL COMMENT 'Certification Photos Url',
    specialty1 varchar(255) DEFAULT ''                NOT NULL COMMENT 'Fisrt specialty',
    specialty2 varchar(255) DEFAULT ''                NOT NULL COMMENT 'Second specialty',
    specialty3 varchar(255) DEFAULT ''                NOT NULL COMMENT 'Third specialty',
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT doctor_id
        UNIQUE (doctor_id)
);



CREATE TABLE specialty_metadata
(
    id           int UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    name        varchar(127) DEFAULT ''                NOT NULL,
    disease varchar(255) DEFAULT ''                NOT NULL COMMENT 'Disease related to this specialty,split by coma',
    description varchar(255) DEFAULT ''                NOT NULL,
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT name
        UNIQUE (name)
);


CREATE TABLE prescription
(
    id           int UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    doctor_id        int          NOT NULL,
    patient_id       int          NOT NULL,
    appointment_id   int          NOT NULL,
    symptom          text         NULL,
    advice          text         NULL,
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE appointment
(
    id           int UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    doctor_id        int          NOT NULL,
    patient_id       int          NOT NULL,
    status           int  DEFAULT  0 NOT NULL COMMENT 'Not started 0 ,ongoing 1, finished 2',
    appointment_ts  BIGINT       NOT NULL DEFAULT 0 COMMENT 'appointment ts',
    start_ts  BIGINT       NOT NULL DEFAULT 0 COMMENT 'appointment start_ts',
    end_ts  BIGINT       NOT NULL DEFAULT 0 COMMENT 'appointment end_ts',
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
);
