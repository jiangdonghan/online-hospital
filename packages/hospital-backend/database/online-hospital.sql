# 存放数据库信息
CREATE TABLE account_log
(
    id            int AUTO_INCREMENT
        PRIMARY KEY,
    userId       int          NULL,
    userEmail    varchar(255) NULL,
    userName     varchar(255) NULL,
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
    avatar varchar(255) DEFAULT ''                NOT NULL,
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
    avatar varchar(255) DEFAULT ''                NOT NULL,
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
    doctorId        int          NOT NULL,
    clinicName        varchar(127) DEFAULT ''                NOT NULL,
    clinicLocation varchar(255) DEFAULT ''                NOT NULL,
    certification varchar(255) DEFAULT ''                NOT NULL COMMENT 'Certification Photos Url',
    specialty1 varchar(255) DEFAULT ''                NOT NULL COMMENT 'Fisrt specialty',
    specialty2 varchar(255) DEFAULT ''                NOT NULL COMMENT 'Second specialty',
    specialty3 varchar(255) DEFAULT ''                NOT NULL COMMENT 'Third specialty',
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT doctorId
        UNIQUE (doctorId)
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
    doctorId        int          NOT NULL,
    patientId       int          NOT NULL,
    appointmentId   int          NOT NULL,
    symptom          text         NULL,
    advice          text         NULL,
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE appointment
(
    id           int UNSIGNED AUTO_INCREMENT
        PRIMARY KEY,
    doctorId        int          NOT NULL,
    patientId       int          NOT NULL,
    status           int  DEFAULT  0 NOT NULL COMMENT 'Not started 0 ,ongoing 1, finished 2',
    appointmentTs  BIGINT       NOT NULL DEFAULT 0 COMMENT 'appointment ts',
    startTs  BIGINT       NOT NULL DEFAULT 0 COMMENT 'appointment start_ts',
    endTs  BIGINT       NOT NULL DEFAULT 0 COMMENT 'appointment end_ts',
    createdAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt    timestamp    DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
);


ALTER TABLE `hospital`.`patient` DROP COLUMN `infoDataStr`;
ALTER TABLE `hospital`.`patient` ADD COLUMN `age` int NOT NULL DEFAULT '0' COMMENT '';
ALTER TABLE `hospital`.`patient` ADD COLUMN `sex` varchar(127) NOT NULL DEFAULT '' COMMENT '';
ALTER TABLE `hospital`.`doctor_info` ADD COLUMN `introduction` varchar(1027) NOT NULL DEFAULT '' COMMENT '';
