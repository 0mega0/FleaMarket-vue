<template>
  <div>
    <el-table
        :data="users"
        border
        style="width: 100%">
      <el-table-column
          prop="username"
          label="用户名"
          width="100">
      </el-table-column>
      <el-table-column
          label="用户身份"
          width="100">
        <template slot-scope="scope">
          {{scope.row.admin ? '管理员' : '普通用户'}}
        </template>
      </el-table-column>
      <el-table-column
          label="用户状态"
          width="100">
        <template slot-scope="scope">
          {{scope.row.active ? '激活' : '未激活'}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              :disabled="scope.row.status === 0"
              @click="editUser(scope.row)"
          >编辑
          </el-button>
          <!--  编辑任务弹出框  -->
          <el-dialog :close-on-click-modal="false" title="任务" :visible.sync="editUserFormVisible">
            <el-form ref="edit_user_form" :model="edit_user_form">
              <el-form-item label="标题">
                <el-input v-model="edit_user_form.username" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="用户状态">
                <el-select v-model="edit_user_form.active" placeholder="请选择用户状态">
                  <el-option
                      v-for="item in active_flag_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任务标记">
                <el-select v-model="edit_user_form.admin" placeholder="请选择任务标记">
                  <el-option
                      v-for="item in admin_flag_options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editUserFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitEditUserForm">确 定</el-button>
            </div>
          </el-dialog>
          <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.status === 1"
              @click="delUserConfirm()"
          >删除
          </el-button>
          <el-dialog
              title="提示"
              :visible.sync="deleteUserDialogVisible"
              width="30%"
              :center="true"
              lock-scroll
              close-on-press-escape>
            <p style="text-align: center">删除当前用户?</p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteUserDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="delUser(scope.row)">确 定</el-button>
            </span>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'User',
    data() {
      return {
        users: [],
        edit_user_form: {},
        editUserFormVisible: false,
        deleteUserDialogVisible: false,
        admin_flag_options: [
          {
            label: '普通用户',
            value: false,
          },
          {
            label: '管理员',
            value: true,
          },
        ],
        active_flag_options: [
          {
            label: '未激活',
            value: false,
          },
          {
            label: '已激活',
            value: true,
          },
        ],
      };
    },
    async created() {
      this.init();
    },
    methods: {
      async init() {
        let res = await this.$api.get('/api/admin/user/get-all');
        console.log(res);
        this.users = res.data;
      },
      editUser(row) {
        this.edit_user_form = row;
        this.editUserFormVisible = true;
        console.log(row);
      },
      async delUser(row) {
        console.log(row);
        let res = await this.$api.post('/api/admin/user/del', qs.stringify({
          user_id: row.id,
        }));
        if (res.code === 0) {
          this.$message({
            message: '删除用户成功',
            type: 'success',
          });
          this.init()
        }
        this.deleteUserDialogVisible=false
      },
      delUserConfirm() {
        this.deleteUserDialogVisible = true
      },
      async submitEditUserForm() {
        console.log(this.edit_user_form);
        let res = await this.$api.post('/api/admin/user/update', this.edit_user_form);
        console.log(res);
        if (res.code === 0) {
          this.editUserFormVisible = false;
        }
      },
    },
  };
</script>

<style scoped>

</style>