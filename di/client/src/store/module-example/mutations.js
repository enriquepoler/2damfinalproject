export function someMutation (/* state */) {
}
export const updateDrawerState = (state, opened) => {
    state.drawerState = opened
    console.log('Updated Drawer')
}