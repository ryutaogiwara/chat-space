## users table

|Column|Type|Options|
|------|----|-------|
|password|string|null: false|
|name|string|null: false, unipue: true|
|mail_address|string|null: false, unique: true|

### Association
- has_many   :groupes, through: :members
- has_many   :messeges
  has_many :members


## members table

|Column|Type|Options|
|------|----|-------|
|user_id|reference|null:false, foreign_key: true|
|group_id|reference|null:false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many   :users, through: :members
  has_many   :messages
  has_many   :members


## messages table

|Column|Type|Options|
|------|----|-------|
|body|string||
|image|string||
|user_id|reference|null:false, foreign_key: true|
|group_id|reference|null:false, foreign_key: true|


### Association
- belongs_to  :user
  belongs_to  :group

