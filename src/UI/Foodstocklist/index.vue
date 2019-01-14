<template>
    <div class="stock">
        <div v-for="(card, index) in items" :key="index" :class="'stock-body'">
            <h4>{{card.title}}</h4>
            <div v-for="(menu, index) in card.menus" :key="index" :class="'stock-body-content'">
                <div class="stock-body-content-image">
                    <img v-if="menu.images.length > 0" :src="menu.images[0].imageData" alt="">
                    <img v-else src="http://via.placeholder.com/300x300" alt="">
                </div>
                <div class="detail">
                    <h5>{{menu.title}}</h5>
                    <div class="detail-footer">
                        <p>{{menu.description}}</p>
                        <div class="detail-footer-action">
                            <b>Rp. {{menu.price}}</b>
                            <div>
                                <button class="btn-left" @click="deleted(menu)">Delete</button>
                                <button class="btn-right" @click="toggleEdit(menu, card)">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="floating-add">
            <button class="plus" @click="toggle">+</button>
            <transition name="fade">
                <div class="popup" v-if="isActive">
                    <button class="subaction category" @click="toggleCategory()">C</button>
                    <button class="subaction menu" @click="toggleMenu()">M</button>
                    <button class="subaction upload" @click="toggleUpload()">U</button>
                </div>
            </transition>
        </div>
        <div class="modal" v-if="isCategory">
            <div class="modal__wrapper">
                <div class="modal__wrapper__header">
                    <span class="close" @click="toggleCategory">x</span>
                    <div class="title">Add Category</div>
                </div>
                <div class="modal__wrapper__body">
                    <input class="form-input" type="text" placeholder="Category Name" v-model="inputCategory">
                </div>
                <div class="modal__wrapper__footer">
                    <button @click="createCategory()">Submit</button>
                </div>
            </div>
        </div>
        <div class="modal" v-if="isUpload">
            <div class="modal__wrapper">
                <div class="modal__wrapper__header">
                    <span class="close" @click="toggleUpload">x</span>
                    <div class="title">Add Image</div>
                </div>
                <div class="modal__wrapper__body">
                  <input class="form-input" type="text" placeholder="Image Name" v-model="inputImageName">
                  <select class="form-input" v-model="inputUploadMenu">
                    <option value="" >Menu</option>
                    <option v-for="(list, index) in menuList" :key="index" :value="list.id">{{list.title}}</option>
                  </select>
                  <input class="form-input" type="file" placeholder="Image" @change="onFileChanged">
                </div>
                <div class="modal__wrapper__footer">
                    <button @click="uploadImage()">Submit</button>
                </div>
            </div>
        </div>
        <div class="modal" v-if="isEdit">
            <div class="modal__wrapper">
                <div class="modal__wrapper__header">
                    <span class="close" @click="toggleEdit">x</span>
                    <div class="title">Edit Menu</div>
                </div>
                <div class="modal__wrapper__body">
                    <input class="form-input" type="text" placeholder="Menu Name" v-model="inputEditTitle">
                    <select class="form-input" v-model="inputEditMenuCategory">
                        <option value="">Category</option>
                        <option v-for="(list, index1) in itemsCategory" :key="index1" :value="list.id">{{list.title}}</option>
                    </select>
                    <select class="form-input" v-model="inputEditState">
                        <option value="">State</option>
                        <option v-for="(list, index) in availibility" :key="index" :value="list.value">{{list.label}}</option>
                    </select>
                    <textarea class="form-input" v-model="inputEditDescription" placeholder="Description" name="" id="" cols="15" rows="3"></textarea>
                    <input class="form-input" type="text" placeholder="Price" v-model="inputEditPrice">
                    <input class="form-input" type="text" placeholder="Discount" v-model="inputEditDiscount">
                </div>
                <div class="modal__wrapper__footer">
                    <button @click="editMenu(inputEditId)">Submit</button>
                </div>
            </div>
        </div>
        <div class="modal" v-if="isMenu">
            <div class="modal__wrapper">
                <div class="modal__wrapper__header">
                    <span class="close" @click="toggleMenu">x</span>
                    <div class="title">Add Menu</div>
                </div>
                <div class="modal__wrapper__body">
                    <input class="form-input" type="text" placeholder="Menu Name" v-model="inputTitle">
                    <select class="form-input" v-model="inputMenuCategory">
                        <option value="">Category</option>
                        <option v-for="(list, index1) in itemsCategory" :key="index1" :value="list.id">{{list.title}}</option>
                    </select>
                    <select class="form-input" v-model="inputState">
                        <option value="" >State</option>
                        <option v-for="(list, index) in availibility" :key="index" :value="list.value">{{list.label}}</option>
                    </select>
                    <textarea class="form-input" v-model="inputDescription" placeholder="Description" name="" id="" cols="15" rows="3"></textarea>
                    <input class="form-input" type="text" placeholder="Price" v-model="inputPrice">
                    <input class="form-input" type="text" placeholder="Discount" v-model="inputDiscount">
                </div>
                <div class="modal__wrapper__footer">
                    <button @click="createMenu()">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import menu from '@/api/menu'
export default {
    name: 'pwa-foodstocklist',
    data(){
      return{
        isActive: false,
        isCategory: false,
        isMenu: false,
        isEdit: false,
        isUpload: false,
        items: [],
        inputCategory: ``,
        inputState: ``,
        inputMenuCategory: ``,
        inputTitle: ``,
        inputPrice: ``,
        inputDescription: ``,
        inputDiscount: ``,
        inputEditState: ``,
        inputEditMenuCategory: ``,
        inputEditTitle: ``,
        inputEditPrice: ``,
        inputEditDescription: ``,
        inputEditDiscount: ``,
        inputEditId: ``,
        inputUploadMenu: ``,
        inputImage: ``,
        inputImageName: ``,
        itemsCategory: [],
        availibility: [
          {
            label: `Available`,
            value: `available`
          },
          {
            label: `Out of Stock`,
            value: `out_of_stock`
          },
        ]
      }
    },
    computed: {
      menuList: function () {
        const data = this.$data.items.filter(x => x.menus.length > 0).map(el => el.menus)
        return data.reduce((acc, val) => acc.concat(val), [])
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        (async () => {
          let data = await menu.menuByCategory()
          this.$data.items = data
          let dataCategory = await menu.getCategory()
          this.$data.itemsCategory = dataCategory
        })();
      },
      onFileChanged (event) {
        const file = event.target.files[0]
        const reader = new FileReader();
        reader.onload = e => {
          const dataURI = e.target.result
          if (dataURI) {
            this.inputImage = dataURI
          }
        }
        reader.readAsDataURL(file)
      },
      toggle() {
          this.isActive = !this.isActive
      },
      toggleCategory() {
          this.isCategory = !this.isCategory
          this.isActive = false
      },
      toggleMenu() {
          this.isMenu = !this.isMenu
          this.isActive = false
      },
      toggleUpload () {
          this.isUpload = !this.isUpload
          this.isActive = false
      },
      toggleEdit(menu = {}, category = {}) {
          this.isEdit = !this.isEdit
          this.isActive = false
          if (this.isEdit) {
            this.inputEditId = menu.id
            this.inputEditTitle = menu.title
            this.inputEditPrice = menu.price
            this.inputEditDescription = menu.description
            this.inputEditMenuCategory = category.id
            this.inputEditState = menu.state
            this.inputEditDiscount = menu.discount
          } else {
            this.inputEditId = ``
            this.inputEditTitle = ``
            this.inputEditPrice = ``
            this.inputEditDescription = ``
            this.inputEditMenuCategory = ``
            this.inputEditState = ``
            this.inputEditDiscount = ``
          }
      },
      deleted(menu) {
        const conf = confirm("are you sure?")
        if (conf) {
          this.deleteMenu(menu.id)
        }
      },
      createCategory() {
        (async () => {
          if (this.inputCategory) {
            const body = {
              title: this.inputCategory
            }
            try {
              const response = await menu.createCategory(body)
              this.toggleCategory()
              this.loadData()
            } catch (error) {
              throw error
            }
          }
        })();
      },
      uploadImage () {
        (async () => {
          if (this.inputImage) {
            const body = {
              name: this.inputImageName,
              menuId: this.inputUploadMenu,
              imageData: this.inputImage
            }
            try {
              const response = await menu.uploadImage(body)
              this.toggleUpload()
              this.loadData()
            } catch (error) {
              throw error
            }
          }
        })();
      },
      createMenu() {
        (async () => {
          if (this.inputMenuCategory) {
            const body = {
              title: this.inputTitle,
              price: this.inputPrice,
              description: this.inputDescription,
              category: this.inputMenuCategory,
              state: this.inputState || undefined,
              discount: this.inputDiscount || undefined
            }
            try {
              const response = await menu.createMenu(body)
              this.toggleMenu()
              this.loadData()
            } catch (error) {
              throw error
            }
          }
        })();
      },
      editMenu(id) {
        (async () => {
          if (this.inputEditMenuCategory) {
            const body = {
              title: this.inputEditTitle,
              price: this.inputEditPrice,
              description: this.inputEditDescription,
              category: this.inputEditMenuCategory,
              state: this.inputEditState || undefined,
              discount: this.inputEditDiscount || undefined
            }
            try {
              const response = await menu.updateMenu(id, body)
              this.toggleEdit()
              this.loadData()
            } catch (error) {
              throw error
            }
          }
        })();
      },
      deleteMenu(id) {
        (async () => {
          if (id) {
            try {
              const response = await menu.deleteMenu(id)
              this.loadData()
            } catch (error) {
              throw error
            }
          }
        })();
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
