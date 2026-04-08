
CREATE DATABASE QuanLyLopHocDB;
GO

USE QuanLyLopHocDB;
GO

-- ==========================================
-- CỤM 1: CẤU HÌNH HỆ THỐNG & DANH MỤC NỀN
-- ==========================================

-- 1. Bảng Cấu hình hệ thống (Lưu dung lượng file, định dạng cho phép...)
CREATE TABLE SystemConfigs (
    ConfigKey VARCHAR(50) PRIMARY KEY,
    ConfigValue NVARCHAR(MAX) NOT NULL,
    Description NVARCHAR(255)
);

-- 2. Bảng Khoa/Ngành
CREATE TABLE Faculties (
    FacultyId INT IDENTITY(1,1) PRIMARY KEY,
    FacultyCode VARCHAR(20) UNIQUE,
    FacultyName NVARCHAR(100) NOT NULL
);

-- 3. Bảng Niên khóa / Học kỳ
CREATE TABLE Semesters (
    SemesterId INT IDENTITY(1,1) PRIMARY KEY,
    SemesterName NVARCHAR(50) NOT NULL, -- Ví dụ: HK1 2025-2026
    StartDate DATE,
    EndDate DATE,
    IsCurrent BIT DEFAULT 0 -- Xác định học kỳ hiện tại
);

-- ==========================================
-- CỤM 2: QUẢN LÝ NGƯỜI DÙNG & PHÂN QUYỀN
-- ==========================================

CREATE TABLE Roles (
    RoleId INT IDENTITY(1,1) PRIMARY KEY,
    RoleName NVARCHAR(50) NOT NULL 
);

CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UserCode VARCHAR(20) UNIQUE, 
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    BirthDay DATE,
    Sex BIT, 
    NumberPhone VARCHAR(20),
    Email VARCHAR(100) UNIQUE,
    AvatarUrl NVARCHAR(MAX) NULL,
    FacultyId INT NULL, -- Liên kết tới Khoa
    RoleId INT NOT NULL,
    IsActive BIT DEFAULT 1, -- Trạng thái tài khoản (1: Hoạt động, 0: Khóa)
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (RoleId) REFERENCES Roles(RoleId),
    FOREIGN KEY (FacultyId) REFERENCES Faculties(FacultyId)
);

-- ==========================================
-- CỤM 3: QUẢN LÝ LỚP HỌC & NHÓM
-- ==========================================

CREATE TABLE Classes (
    ClassId INT IDENTITY(1,1) PRIMARY KEY,
    ClassCode VARCHAR(20) UNIQUE,
    ClassName NVARCHAR(100) NOT NULL,
    TeacherId INT NOT NULL, 
    SemesterId INT NOT NULL, -- Lớp học phải thuộc về 1 học kỳ
    FOREIGN KEY (TeacherId) REFERENCES Users(UserId),
    FOREIGN KEY (SemesterId) REFERENCES Semesters(SemesterId)

    
);
--CẬP NHẬT BẢNG CLASSES (Thêm thông tin thời gian học)
ALTER TABLE Classes 
    ADD StartDate DATE NULL,
    EndDate DATE NULL,
    StudyTime NVARCHAR(255) NULL; -- Thời gian học (ví dụ: Thứ 2,4,6 18:00-20:00)

CREATE TABLE ClassStudents (
    ClassId INT NOT NULL,
    StudentId INT NOT NULL,
    PRIMARY KEY (ClassId, StudentId),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    FOREIGN KEY (StudentId) REFERENCES Users(UserId)
);

CREATE TABLE Groups (
    GroupId INT IDENTITY(1,1) PRIMARY KEY,
    GroupName NVARCHAR(100) NOT NULL,
    MaxMembers INT DEFAULT 5, 
    ClassId INT NOT NULL,
    LeaderId INT NULL, 
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId),
    FOREIGN KEY (LeaderId) REFERENCES Users(UserId)
);
-- 3. CẬP NHẬT BẢNG GROUPS (Liên kết Đề tài vào Nhóm)
ALTER TABLE Groups 
ADD TopicId INT NULL; -- Nhóm được giao hoặc đăng ký đề tài nào

ALTER TABLE Groups 
ADD CONSTRAINT FK_Groups_Topics FOREIGN KEY (TopicId) REFERENCES Topics(TopicId);


CREATE TABLE GroupMembers (
    GroupId INT NOT NULL,
    StudentId INT NOT NULL,
    PRIMARY KEY (GroupId, StudentId),
    FOREIGN KEY (GroupId) REFERENCES Groups(GroupId),
    FOREIGN KEY (StudentId) REFERENCES Users(UserId)
);

-- ==========================================
-- CỤM 4: QUẢN LÝ CÔNG VIỆC (TASKS)
-- ==========================================

CREATE TABLE Tasks (
    TaskId INT IDENTITY(1,1) PRIMARY KEY,
    GroupId INT NOT NULL,
    TaskName NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    StartDate DATETIME,
    DueDate DATETIME,
    Priority NVARCHAR(50), -- Cao, Trung bình, Thấp
    Status NVARCHAR(50) DEFAULT N'chưa bắt đầu', -- chưa bắt đầu, đang thực hiện, đã hoàn thành, trễ hạn
    CompletionPercent INT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (GroupId) REFERENCES Groups(GroupId)
);
-- CẬP NHẬT BẢNG TASKS (Liên kết Task vào Đề tài tổng quát)
ALTER TABLE Tasks
ADD TopicId INT NULL; -- Đảm bảo task con bám sát đề tài mẹ

ALTER TABLE Tasks
ADD CONSTRAINT FK_Tasks_Topics FOREIGN KEY (TopicId) REFERENCES Topics(TopicId);


-- Bảng phân công nhiệm vụ (Cho phép 1 task giao cho NHIỀU người)
CREATE TABLE TaskAssignees (
    TaskId INT NOT NULL,
    UserId INT NOT NULL,
    PRIMARY KEY (TaskId, UserId),
    FOREIGN KEY (TaskId) REFERENCES Tasks(TaskId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE TABLE TaskHistory (
    HistoryId INT IDENTITY(1,1) PRIMARY KEY,
    TaskId INT NOT NULL,
    UpdatedById INT NOT NULL,
    UpdateDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(50),
    CompletionPercent INT,
    Note NVARCHAR(MAX),
    FOREIGN KEY (TaskId) REFERENCES Tasks(TaskId),
    FOREIGN KEY (UpdatedById) REFERENCES Users(UserId)
);

-- ==========================================
-- CỤM 5: QUẢN LÝ THẢO LUẬN & FILE
-- ==========================================

CREATE TABLE Messages (
    MessageId INT IDENTITY(1,1) PRIMARY KEY,
    GroupId INT NOT NULL,
    SenderId INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    SendTime DATETIME DEFAULT GETDATE(),
    ParentMessageId INT NULL, -- Để làm chức năng Reply theo Thread
    FOREIGN KEY (GroupId) REFERENCES Groups(GroupId),
    FOREIGN KEY (SenderId) REFERENCES Users(UserId),
    FOREIGN KEY (ParentMessageId) REFERENCES Messages(MessageId)
);

CREATE TABLE Attachments (
    AttachmentId INT IDENTITY(1,1) PRIMARY KEY,
    MessageId INT NULL, -- File trong tin nhắn
    TaskId INT NULL, -- File trong nhiệm vụ nộp bài
    FileName NVARCHAR(255) NOT NULL,
    FilePath VARCHAR(MAX) NOT NULL,
    FileSize INT, -- Lưu dung lượng để kiểm tra với cấu hình hệ thống
    UploadedBy INT,
    UploadDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MessageId) REFERENCES Messages(MessageId),
    FOREIGN KEY (TaskId) REFERENCES Tasks(TaskId),
    FOREIGN KEY (UploadedBy) REFERENCES Users(UserId)
);
--CẬP NHẬT BẢNG ATTACHMENTS (Hỗ trợ file cho Đề tài)
ALTER TABLE Attachments
ADD TopicId INT NULL; -- Tài liệu hướng dẫn của đề tài

ALTER TABLE Attachments
ADD CONSTRAINT FK_Attachments_Topics FOREIGN KEY (TopicId) REFERENCES Topics(TopicId);

-- BẢNG TOPICS (Quản lý Đề tài/Chủ đề môn học)
CREATE TABLE Topics (
    TopicId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    ExpectedOutput NVARCHAR(MAX), -- Sản phẩm kỳ vọng
    ClassId INT NOT NULL,
    StartDate DATETIME,
    EndDate DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (ClassId) REFERENCES Classes(ClassId)
);

-- BẢNG TRANSFER_REQUESTS (Yêu cầu chuyển nhóm)
CREATE TABLE TransferRequests (
    RequestId INT IDENTITY(1,1) PRIMARY KEY,
    StudentId INT NOT NULL,
    FromGroupId INT NOT NULL,
    ToGroupId INT NOT NULL,
    Reason NVARCHAR(MAX),
    Status NVARCHAR(50) DEFAULT N'Pending', -- Pending, Approved, Rejected
    NoteFromTeacher NVARCHAR(MAX), -- Giảng viên phản hồi lý do từ chối/đồng ý
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL, -- Thời điểm GV phê duyệt
    FOREIGN KEY (StudentId) REFERENCES Users(UserId),
    FOREIGN KEY (FromGroupId) REFERENCES Groups(GroupId),
    FOREIGN KEY (ToGroupId) REFERENCES Groups(GroupId)
);
GO

-- ==========================================
-- DỮ LIỆU MẪU BAN ĐẦU
-- ==========================================

INSERT INTO Roles (RoleName) VALUES (N'Admin'), (N'Giảng viên'), (N'Sinh viên');

INSERT INTO SystemConfigs (ConfigKey, ConfigValue, Description) 
VALUES ('MaxFileSizeMB', '20', N'Dung lượng file tối đa cho phép (MB)'),
       ('AllowedExtensions', '.pdf,.docx,.zip,.jpg,.png', N'Các định dạng file cho phép');

INSERT INTO Semesters (SemesterName, IsCurrent) VALUES (N'Học kỳ 2 2025-2026', 1);

PRINT N'Cập nhật Database thành công!';